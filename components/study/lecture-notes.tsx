import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import type { Scenario } from "@/types/study";

export function LectureNotes({
  task,
  open,
  onToggle,
  buttonRef,
}: {
  task: Scenario;
  open: boolean;
  onToggle: (open: boolean) => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
  function close() {
    onToggle(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          ref={buttonRef}
          aria-expanded={open}
          aria-controls="lecture-notes"
          onClick={() => onToggle(!open)}
        >
          {open ? "Close lecture notes" : "Open lecture notes"}
        </Button>
        <span className="text-muted text-xs">Optional</span>
      </div>
      {open && (
        <section
          id="lecture-notes"
          aria-labelledby="notes-heading"
          className="border-line bg-paper mt-4 rounded-lg border p-5"
        >
          <h2
            id="notes-heading"
            className="text-sm leading-relaxed font-medium"
          >
            Lecture notes: retrieval, grounding and provenance
          </h2>
          <p className="mt-3 text-sm leading-7">{task.notes}</p>
          <div className="border-line text-muted mt-4 border-t pt-3 text-xs leading-6">
            <p>
              Adapted study notes based on Lecture 11, PDF pages{" "}
              {task.source.pages}.
            </p>
            <p className="wrap-anywhere">{task.source.filename}</p>
            <p>
              Source checked: {task.source.checked}. Check date, not publication
              date.
            </p>
            <a
              href={task.source.url}
              target="_blank"
              rel="noreferrer"
              className="text-action mt-2 inline-block min-h-9 py-1 underline underline-offset-4"
            >
              Open original lecture in Canvas{" "}
              <span className="sr-only">
                (opens in a new tab; university sign-in may be needed)
              </span>
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
          <Button className="mt-3" onClick={close}>
            Close lecture notes
          </Button>
        </section>
      )}
    </div>
  );
}
