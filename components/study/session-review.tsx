import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { conditions } from "@/content/scenarios";
import {
  answerLabel,
  eventDescription,
  notesWereOpened,
} from "@/lib/study-session";
import type { ReviewState, Scenario } from "@/types/study";

export function SessionReview({
  state,
  task,
  onRestart,
}: {
  state: ReviewState;
  task: Scenario;
  onRestart: () => void;
}) {
  const condition = conditions.find(
    (item) => item.value === state.condition,
  )?.label;
  const facts = [
    [
      "Answer changed",
      state.initialAnswer === state.finalAnswer
        ? "No · kept the same choice"
        : "Yes · changed the choice",
    ],
    [
      "Notes opened before submission",
      notesWereOpened(state.events) ? "Yes" : "No",
    ],
    [
      "Final answer matches the expected answer",
      state.finalAnswer === "not-sure"
        ? "Not sure selected"
        : state.finalAnswer === task.expectedAnswer
          ? "Yes"
          : "No",
    ],
    ["Reminder style", condition],
  ];

  return (
    <>
      <div className="my-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        {[
          { label: "Initial answer", value: state.initialAnswer },
          { label: "Final answer", value: state.finalAnswer },
        ].map((item, index) => (
          <Fragment key={item.label}>
            {index === 1 && (
              <span aria-hidden="true" className="text-muted text-xl">
                →
              </span>
            )}
            <div className="border-line bg-surface rounded-lg border p-4 sm:p-5">
              <p className="text-muted text-xs">{item.label}</p>
              <p className="mt-2 font-serif text-2xl">
                {answerLabel(item.value)}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <dl>
        {facts.map(([label, value]) => (
          <div
            key={label}
            className="border-line flex justify-between gap-4 border-b py-3 text-sm"
          >
            <dt className="text-muted">{label}</dt>
            <dd className="max-w-[52%] text-right">{value}</dd>
          </div>
        ))}
      </dl>
      <section className="mt-7" aria-labelledby="expected-answer-heading">
        <h2 id="expected-answer-heading" className="text-base font-medium">
          Expected answer: {answerLabel(task.expectedAnswer)}
        </h2>
        <p className="mt-3 text-sm leading-7">{task.explanation}</p>
        <p className="text-muted mt-4 text-xs">
          The error in the simulated advice was:
        </p>
        <blockquote className="border-line bg-surface mt-2 rounded-lg border p-4 text-sm leading-6">
          {task.erroneousClaim}
        </blockquote>
        <p className="text-muted mt-3 text-xs leading-6">
          Lecture 11 · PDF page 5, “Different sources, different failures”;
          pages 8 and 10 provide supporting context.
        </p>
      </section>
      <p className="text-muted mt-5 text-xs leading-6">
        This record shows your choices and note access; it does not show why you
        chose an answer.
      </p>
      <details className="border-line mt-5 border-t pt-4">
        <summary className="text-sm font-medium">
          See the recorded actions
        </summary>
        <ol className="text-muted mt-3 space-y-2 text-xs">
          {state.events.map((event) => (
            <li key={event.id} className="flex gap-3">
              <span className="min-w-12 shrink-0 tabular-nums">
                {(event.elapsedMs / 1000).toFixed(1)} s
              </span>
              <span>{eventDescription(event)}</span>
            </li>
          ))}
        </ol>
        <p className="text-muted mt-3 text-xs">
          Times are elapsed since session start, not active reading time.
        </p>
      </details>
      <Button className="mt-6" variant="primary" onClick={onRestart}>
        Choose another reminder <span aria-hidden="true">→</span>
      </Button>
    </>
  );
}
