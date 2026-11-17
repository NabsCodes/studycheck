import type {
  Answer,
  NewSessionEvent,
  SessionEvent,
  StudyAction,
  StudyState,
} from "@/types/study";

export const initialState: StudyState = {
  stage: "setup",
  condition: "general",
};

function appendEvent(
  state: Exclude<StudyState, { stage: "setup" }>,
  detail: NewSessionEvent,
  at: number,
): SessionEvent[] {
  const previous = state.events.at(-1)?.elapsedMs ?? 0;
  return [
    ...state.events,
    {
      ...detail,
      id: `${state.sessionId}-${state.events.length + 1}`,
      elapsedMs: Math.max(previous, at - state.startedAt, 0),
    },
  ];
}

// React and the tests use these same rules. Unexpected/repeated actions are ignored.
export function studySessionReducer(
  state: StudyState,
  action: StudyAction,
): StudyState {
  switch (action.type) {
    case "choose-condition":
      return state.stage === "setup"
        ? { ...state, condition: action.condition }
        : state;
    case "start": {
      if (state.stage !== "setup") return state;
      const active = {
        stage: "initial" as const,
        condition: state.condition,
        sessionId: action.sessionId,
        task: action.task,
        startedAt: action.at,
        draft: null,
        showError: false,
        events: [],
      };
      return {
        ...active,
        events: appendEvent(active, { kind: "session-started" }, action.at),
      };
    }
    case "select-initial":
      return state.stage === "initial"
        ? { ...state, draft: action.answer, showError: false }
        : state;
    case "commit-initial": {
      if (state.stage !== "initial") return state;
      if (!state.draft) return { ...state, showError: true };
      return {
        stage: "decision",
        condition: state.condition,
        sessionId: state.sessionId,
        task: state.task,
        startedAt: state.startedAt,
        initialAnswer: state.draft,
        finalDraft: state.draft,
        notesOpen: false,
        events: appendEvent(
          state,
          { kind: "initial-answer-committed", answer: state.draft },
          action.at,
        ),
      };
    }
    case "advice-presented":
      if (
        state.stage !== "decision" ||
        state.events.some((event) => event.kind === "advice-presented")
      )
        return state;
      return {
        ...state,
        events: appendEvent(state, { kind: "advice-presented" }, action.at),
      };
    case "set-notes-open":
      return state.stage === "decision"
        ? { ...state, notesOpen: action.open }
        : state;
    case "notes-rendered": {
      if (state.stage !== "decision" || state.notesOpen !== action.open)
        return state;
      const previous = state.events.findLast(
        (event) => event.kind === "notes-visibility",
      );
      const wasOpen =
        previous?.kind === "notes-visibility" ? previous.open : false;
      if (wasOpen === action.open) return state;
      return {
        ...state,
        events: appendEvent(
          state,
          { kind: "notes-visibility", open: action.open },
          action.at,
        ),
      };
    }
    case "select-final":
      if (state.stage !== "decision" || state.finalDraft === action.answer)
        return state;
      return {
        ...state,
        finalDraft: action.answer,
        events: appendEvent(
          state,
          { kind: "final-selection-changed", answer: action.answer },
          action.at,
        ),
      };
    case "submit-final":
      if (state.stage !== "decision") return state;
      return {
        stage: "review",
        condition: state.condition,
        sessionId: state.sessionId,
        task: state.task,
        startedAt: state.startedAt,
        initialAnswer: state.initialAnswer,
        finalAnswer: state.finalDraft,
        events: appendEvent(
          state,
          { kind: "final-answer-submitted", answer: state.finalDraft },
          action.at,
        ),
      };
    case "restart":
      return { stage: "setup", condition: state.condition };
  }
}

export function answerLabel(answer: Answer) {
  return answer === "not-sure" ? "Not sure" : answer === "yes" ? "Yes" : "No";
}

export function notesWereOpened(events: SessionEvent[]) {
  return events.some(
    (event) => event.kind === "notes-visibility" && event.open,
  );
}

export function eventDescription(event: SessionEvent) {
  switch (event.kind) {
    case "session-started":
      return "Session started.";
    case "initial-answer-committed":
      return `Initial answer saved: ${answerLabel(event.answer)}.`;
    case "advice-presented":
      return "Fixed simulated advice and reliability reminder displayed.";
    case "notes-visibility":
      return `Lecture notes ${event.open ? "opened" : "closed"}.`;
    case "final-selection-changed":
      return `Final-answer selection changed to ${answerLabel(event.answer)}.`;
    case "final-answer-submitted":
      return `Final answer submitted: ${answerLabel(event.answer)}.`;
  }
}
