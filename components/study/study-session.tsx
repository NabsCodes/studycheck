"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AnswerChoices } from "@/components/study/answer-choices";
import { LectureNotes } from "@/components/study/lecture-notes";
import { SessionReview } from "@/components/study/session-review";
import { conditions } from "@/content/scenarios";
import { useStudySession } from "@/hooks/use-study-session";
import { answerLabel } from "@/lib/study-session";
import type { Scenario } from "@/types/study";

const steps = [
  { stage: "initial", label: "Your answer" },
  { stage: "decision", label: "Advice & decision" },
  { stage: "review", label: "Session review" },
];

const headings = {
  setup: "Choose a reminder style.",
  initial: "What do you think?",
  decision: "Compare, then decide.",
  review: "Here is what happened.",
};

export function StudySession({ task }: { task: Scenario }) {
  const {
    state,
    chooseCondition,
    start,
    selectInitial,
    commitInitial,
    setNotesOpen,
    selectFinal,
    submitFinal,
    restart,
  } = useStudySession(task);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const notesButtonRef = useRef<HTMLButtonElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const currentStep = steps.findIndex((step) => step.stage === state.stage);
  const condition = conditions.find(
    (item) => item.value === state.condition,
  )?.label;
  const showError = state.stage === "initial" && state.showError;

  useEffect(() => {
    headingRef.current?.focus();
  }, [state.stage]);
  useEffect(() => {
    if (showError) errorRef.current?.focus();
  }, [showError]);

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-10">
      <a
        href="#task-heading"
        className="sr-only focus:not-sr-only focus:mb-4 focus:inline-block"
      >
        Skip to the task
      </a>
      <div className="border-line bg-paper overflow-hidden rounded-xl border">
        <header className="border-line bg-surface flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="border-action text-action grid size-8 place-items-center rounded-lg border text-xs font-medium"
            >
              SC
            </span>
            <p className="font-serif text-2xl tracking-tight">StudyCheck</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-muted hidden text-xs sm:block">
              Task 01 · {task.title}
            </p>
            {state.stage !== "setup" && (
              <Button
                onClick={restart}
                aria-label="Restart and clear this session"
              >
                Restart
              </Button>
            )}
          </div>
        </header>
        <div className="grid md:grid-cols-[174px_minmax(0,1fr)]">
          <aside
            aria-label="Session progress"
            className="border-line bg-surface border-b p-4 md:border-r md:border-b-0 md:px-5 md:py-7"
          >
            <p className="text-muted mb-5 hidden text-xs md:block">
              Your session
            </p>
            <ol className="flex justify-between gap-3 md:flex-col md:gap-6">
              {steps.map((step, index) => (
                <li
                  key={step.stage}
                  aria-current={state.stage === step.stage ? "step" : undefined}
                  className={`flex flex-1 items-start gap-2 text-xs ${state.stage === step.stage ? "text-ink font-medium" : "text-muted"}`}
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full border text-xs ${state.stage === step.stage ? "border-action bg-action text-on-action" : currentStep > index ? "border-action text-action" : "border-line"}`}
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1">{step.label}</span>
                </li>
              ))}
            </ol>
            <div className="border-line mt-4 flex flex-wrap gap-2 border-t pt-3 text-xs md:mt-9 md:block md:pt-4">
              <p className="text-muted">Reminder style</p>
              <p className="font-medium md:mt-2">
                {state.stage === "setup" ? "Choose before starting" : condition}
              </p>
              <p className="text-muted md:mt-1">
                {state.stage === "setup"
                  ? "Setup only"
                  : "Locked for this session"}
              </p>
            </div>
          </aside>
          <main className="min-w-0 p-5 sm:p-8 lg:p-10">
            {(state.stage === "initial" || state.stage === "decision") && (
              <p className="border-line text-muted mb-6 border-b pb-4 text-xs leading-6">
                This prototype uses fixed, simulated AI advice and warnings.
                They may be wrong.
              </p>
            )}
            <p className="text-muted mb-2 text-xs">
              {state.stage === "setup"
                ? "Before the session"
                : state.stage === "review"
                  ? "Task 01 · session complete"
                  : state.stage === "initial"
                    ? "Task 01 · your answer first"
                    : "Task 01 · advice & decision"}
            </p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              id="task-heading"
              className="font-serif text-[1.75rem] leading-tight tracking-tight sm:text-3xl"
            >
              {headings[state.stage]}
            </h1>

            {state.stage === "setup" && (
              <>
                <p className="text-muted mt-3 text-sm leading-6">
                  Both versions use the same question, advice and lecture notes.
                </p>
                <fieldset className="mt-7 space-y-3">
                  <legend className="mb-3 text-sm font-medium">
                    Reminder condition
                  </legend>
                  {conditions.map((item) => (
                    <label
                      key={item.value}
                      className="border-line bg-surface has-checked:border-action has-checked:bg-soft flex items-start gap-3 rounded-lg border p-4"
                    >
                      <input
                        className="accent-action mt-1 size-4 shrink-0"
                        type="radio"
                        name="condition"
                        value={item.value}
                        checked={state.condition === item.value}
                        onChange={() => chooseCondition(item.value)}
                      />
                      <span>
                        <span className="block text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="text-muted mt-1 block text-xs leading-6">
                          {item.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <Button variant="primary" className="mt-6" onClick={start}>
                  Start session <span aria-hidden="true">→</span>
                </Button>
                <ul className="border-line text-muted mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-xs">
                  <li>One fixed task</li>
                  <li>Optional lecture notes</li>
                  <li>No live AI model</li>
                </ul>
                <p className="text-muted mt-4 text-xs leading-6">
                  This setup is separate from the student task. The reminder
                  style stays locked during a session.
                </p>
              </>
            )}

            {(state.stage === "initial" || state.stage === "decision") && (
              <p className="mt-6 text-lg leading-8">{task.question}</p>
            )}

            {state.stage === "initial" && (
              <form
                noValidate
                className="mt-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  commitInitial();
                }}
              >
                <AnswerChoices
                  name="initial-answer"
                  legend="Your initial answer"
                  value={state.draft}
                  onChange={selectInitial}
                  invalid={showError}
                />
                {showError && (
                  <p
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    id="initial-error"
                    className="text-error mt-3 text-sm"
                  >
                    Choose Yes, No or Not sure before continuing.
                  </p>
                )}
                <p className="text-muted mt-3 text-xs leading-6">
                  Your first choice is saved before you see the advice.
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-6 w-full sm:w-auto"
                >
                  Save initial answer and view advice{" "}
                  <span aria-hidden="true">→</span>
                </Button>
              </form>
            )}

            {state.stage === "decision" && (
              <>
                <div className="border-line bg-soft mt-5 flex flex-wrap justify-between gap-2 rounded-lg border px-4 py-3 text-xs">
                  <p>
                    Your initial answer:{" "}
                    <strong className="font-medium">
                      {answerLabel(state.initialAnswer)}
                    </strong>
                  </p>
                  <p className="text-muted">Saved before advice</p>
                </div>
                <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.85fr)]">
                  <section aria-labelledby="advice-heading">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <h2 id="advice-heading" className="text-base font-medium">
                        Simulated AI advice
                      </h2>
                      <span className="border-line text-muted rounded border px-2 py-1 text-[11px]">
                        Fixed text
                      </span>
                    </div>
                    <p className="text-sm leading-7">{task.advice}</p>
                    <aside
                      aria-labelledby="reminder-heading"
                      className="bg-caution text-caution-ink mt-5 min-h-40 rounded-lg p-4"
                    >
                      <h3 id="reminder-heading" className="text-sm font-medium">
                        Reliability reminder
                      </h3>
                      <p className="mt-2 text-sm leading-7">
                        {task.warnings[state.condition]}
                      </p>
                    </aside>
                    <LectureNotes
                      task={task}
                      open={state.notesOpen}
                      onToggle={setNotesOpen}
                      buttonRef={notesButtonRef}
                    />
                  </section>
                  <form
                    noValidate
                    className="border-line border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6"
                    onSubmit={(event) => {
                      event.preventDefault();
                      submitFinal();
                    }}
                  >
                    <p
                      id="final-help"
                      className="text-muted mb-4 text-xs leading-6"
                    >
                      Keep this choice or select a different final answer.
                    </p>
                    <AnswerChoices
                      name="final-answer"
                      legend="Your final answer"
                      value={state.finalDraft}
                      onChange={selectFinal}
                      vertical
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-5 w-full"
                    >
                      Submit final answer <span aria-hidden="true">→</span>
                    </Button>
                    <p className="text-muted mt-3 text-xs leading-6">
                      You can submit without opening the notes.
                    </p>
                  </form>
                </div>
              </>
            )}

            {state.stage === "review" && (
              <>
                <p className="text-muted mt-3 text-sm leading-6">
                  Your submitted choices and note access for this session.
                </p>
                <SessionReview state={state} task={task} onRestart={restart} />
              </>
            )}
            <footer className="border-line text-muted mt-8 flex flex-wrap justify-between gap-x-5 gap-y-2 border-t pt-4 text-[11px] leading-6">
              <p>StudyCheck · fixed simulated advice and warnings</p>
              <p>Restarting or reloading clears this session.</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
