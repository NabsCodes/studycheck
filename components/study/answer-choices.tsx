import { answerOptions } from "@/content/scenarios";
import type { Answer } from "@/types/study";

export function AnswerChoices({
  name,
  legend,
  value,
  onChange,
  vertical = false,
  invalid = false,
}: {
  name: string;
  legend: string;
  value: Answer | null;
  onChange: (answer: Answer) => void;
  vertical?: boolean;
  invalid?: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium">{legend}</legend>
      <div className={`flex gap-2.5 ${vertical ? "flex-col" : "flex-wrap"}`}>
        {answerOptions.map((option) => (
          <label
            key={option.value}
            className="border-line bg-surface has-checked:border-action has-checked:bg-soft flex min-h-12 min-w-22 items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm"
          >
            <input
              className="accent-action size-4 shrink-0"
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              aria-describedby={invalid ? "initial-error" : undefined}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
