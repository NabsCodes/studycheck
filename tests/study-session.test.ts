import { describe, expect, it } from "vitest";
import { task01 } from "@/content/scenarios";
import {
  initialState,
  notesWereOpened,
  studySessionReducer as reduce,
} from "@/lib/study-session";
import type { Answer, Condition, StudyState } from "@/types/study";

function start(condition: Condition = "general", sessionId = "session-a") {
  const setup = reduce(initialState, { type: "choose-condition", condition });
  return reduce(setup, { type: "start", sessionId, task: task01, at: 100 });
}

function decision(answer: Answer = "yes") {
  let state = start();
  state = reduce(state, { type: "select-initial", answer });
  return reduce(state, { type: "commit-initial", at: 120 });
}

describe("Task 01 session boundaries", () => {
  it("does not commit an empty answer or log it as a successful action", () => {
    const state = reduce(start(), { type: "commit-initial", at: 120 });
    expect(state).toMatchObject({
      stage: "initial",
      draft: null,
      showError: true,
    });
    if (state.stage === "setup") throw new Error("Expected active state");
    expect(state.events.map((event) => event.kind)).toEqual([
      "session-started",
    ]);
  });

  it("locks condition and start identity after a session begins", () => {
    const state = start("claim-specific");
    expect(
      reduce(state, { type: "choose-condition", condition: "general" }),
    ).toBe(state);
    expect(
      reduce(state, {
        type: "start",
        sessionId: "replacement",
        task: task01,
        at: 110,
      }),
    ).toBe(state);
  });

  it("preserves initial answers for every final choice, in both conditions, with or without notes", () => {
    const answers: Answer[] = ["yes", "no", "not-sure"];
    const conditions: Condition[] = ["general", "claim-specific"];
    for (const condition of conditions)
      for (const initial of answers)
        for (const final of answers)
          for (const useNotes of [false, true]) {
            let state = start(condition);
            state = reduce(state, { type: "select-initial", answer: initial });
            state = reduce(state, { type: "commit-initial", at: 120 });
            state = reduce(state, { type: "advice-presented", at: 121 });
            if (useNotes) {
              state = reduce(state, { type: "set-notes-open", open: true });
              state = reduce(state, {
                type: "notes-rendered",
                open: true,
                at: 130,
              });
            }
            state = reduce(state, {
              type: "select-final",
              answer: final,
              at: 140,
            });
            state = reduce(state, { type: "submit-final", at: 150 });
            expect(state).toMatchObject({
              stage: "review",
              condition,
              initialAnswer: initial,
              finalAnswer: final,
            });
            if (state.stage !== "review")
              throw new Error("Expected completed session");
            expect(notesWereOpened(state.events)).toBe(useNotes);
            expect(
              state.events.filter(
                (event) => event.kind === "initial-answer-committed",
              ),
            ).toHaveLength(1);
          }
  });

  it("records note access after presentation, handles reopen, and deduplicates effect replay", () => {
    let state = decision();
    state = reduce(state, { type: "advice-presented", at: 121 });
    const displayed = state;
    expect(reduce(state, { type: "advice-presented", at: 122 })).toBe(
      displayed,
    );
    state = reduce(state, { type: "set-notes-open", open: true });
    if (state.stage !== "decision") throw new Error("Expected decision");
    expect(notesWereOpened(state.events)).toBe(false);
    state = reduce(state, { type: "notes-rendered", open: true, at: 130 });
    const opened = state;
    expect(reduce(state, { type: "notes-rendered", open: true, at: 131 })).toBe(
      opened,
    );
    state = reduce(state, { type: "set-notes-open", open: false });
    state = reduce(state, { type: "notes-rendered", open: false, at: 140 });
    state = reduce(state, { type: "set-notes-open", open: true });
    state = reduce(state, { type: "notes-rendered", open: true, at: 150 });
    if (state.stage !== "decision") throw new Error("Expected decision");
    expect(
      state.events.filter((event) => event.kind === "notes-visibility"),
    ).toMatchObject([{ open: true }, { open: false }, { open: true }]);
  });

  it("does not treat an unrendered or stale notes toggle as access", () => {
    let state = decision();
    state = reduce(state, { type: "set-notes-open", open: true });
    state = reduce(state, { type: "set-notes-open", open: false });
    state = reduce(state, { type: "notes-rendered", open: true, at: 130 });
    state = reduce(state, { type: "submit-final", at: 140 });
    if (state.stage !== "review") throw new Error("Expected review");
    expect(notesWereOpened(state.events)).toBe(false);
  });

  it("freezes final submission and ignores later note, answer and submit actions", () => {
    const state = reduce(decision(), { type: "submit-final", at: 150 });
    for (const action of [
      { type: "select-initial", answer: "no" },
      { type: "select-final", answer: "no", at: 160 },
      { type: "set-notes-open", open: true },
      { type: "notes-rendered", open: true, at: 160 },
      { type: "submit-final", at: 170 },
    ] as const)
      expect(reduce(state, action)).toBe(state);
  });

  it("starts a new session with no answers or events from the previous one", () => {
    const previous = reduce(decision(), { type: "submit-final", at: 150 });
    let state: StudyState = reduce(previous, { type: "restart" });
    expect(state).toEqual({ stage: "setup", condition: "general" });
    state = reduce(state, {
      type: "start",
      sessionId: "session-b",
      task: task01,
      at: 200,
    });
    expect(state).toMatchObject({
      stage: "initial",
      draft: null,
      sessionId: "session-b",
    });
    if (state.stage === "setup") throw new Error("Expected active state");
    expect(state.events).toHaveLength(1);
    expect(state.events[0]).toMatchObject({
      id: "session-b-1",
      elapsedMs: 0,
      kind: "session-started",
    });
    expect(previous).toMatchObject({
      stage: "review",
      sessionId: "session-a",
      initialAnswer: "yes",
    });
  });
});
