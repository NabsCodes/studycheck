import { answerOptions } from "@/content/scenarios";
import type { Answer } from "@/types/study";

export function AnswerChoices({
  name,
  legend,
  value,
  onChange,
  vertical = false,
  invalid = false,
  describedBy,
}: {
  name: string;
  legend: string;
  value: Answer | null;
  onChange: (answer: Answer) => void;
  vertical?: boolean;
  invalid?: boolean;
  describedBy?: string;
}) {
  const description = invalid ? "initial-error" : describedBy;

  return (
    <fieldset aria-describedby={description}>
      <legend className="mb-3 text-sm font-medium">{legend}</legend>
      <div
        className={`grid gap-2.5 ${vertical ? "grid-cols-1" : "grid-cols-1 min-[380px]:grid-cols-3"}`}
      >
        {answerOptions.map((option) => (
          <label
            key={option.value}
            className="border-line bg-surface hover:border-action has-checked:border-action has-checked:bg-soft flex min-h-12 items-center gap-2 rounded-lg border px-3 py-3 text-sm transition-colors motion-reduce:transition-none min-[380px]:px-2 sm:px-4"
          >
            <input
              className="accent-action size-4 shrink-0"
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              aria-describedby={description}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
