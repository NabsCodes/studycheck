"use client";

import { useEffect, useReducer } from "react";
import { initialState, studySessionReducer } from "@/lib/study-session";
import type { Answer, Condition, Scenario } from "@/types/study";

export function useStudySession(task: Scenario) {
  const [state, dispatch] = useReducer(studySessionReducer, initialState);
  const notesOpen = state.stage === "decision" && state.notesOpen;

  // Effects run after React commits the visible advice/notes. Reducer guards
  // deduplicate effect replay in development, rather than logging every render.
  useEffect(() => {
    if (state.stage !== "decision") return;
    dispatch({ type: "advice-presented", at: performance.now() });
    dispatch({
      type: "notes-rendered",
      open: notesOpen,
      at: performance.now(),
    });
  }, [state.stage, notesOpen]);

  return {
    state,
    chooseCondition: (condition: Condition) =>
      dispatch({ type: "choose-condition", condition }),
    start: () =>
      dispatch({
        type: "start",
        sessionId: crypto.randomUUID(),
        at: performance.now(),
        task: {
          id: task.id,
          version: task.version,
          adviceVersion: task.adviceVersion,
          notesVersion: task.notesVersion,
          messageVersion: task.messageVersion,
        },
      }),
    selectInitial: (answer: Answer) =>
      dispatch({ type: "select-initial", answer }),
    commitInitial: () =>
      dispatch({ type: "commit-initial", at: performance.now() }),
    setNotesOpen: (open: boolean) => dispatch({ type: "set-notes-open", open }),
    selectFinal: (answer: Answer) =>
      dispatch({ type: "select-final", answer, at: performance.now() }),
    submitFinal: () =>
      dispatch({ type: "submit-final", at: performance.now() }),
    restart: () => dispatch({ type: "restart" }),
  };
}
