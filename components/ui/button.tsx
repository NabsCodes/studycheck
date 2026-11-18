import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "secondary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const appearance =
    variant === "primary"
      ? "border-action bg-action text-on-action hover:border-action-hover hover:bg-action-hover"
      : "border-line bg-surface text-ink hover:border-action hover:bg-soft";

  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 motion-reduce:transition-none ${appearance} ${className}`}
      {...props}
    />
  );
}
