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
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 motion-reduce:transition-none ${variant === "primary" ? "border-action bg-action text-on-action hover:opacity-90" : "border-line bg-surface text-ink hover:bg-soft"} ${className}`}
      {...props}
    />
  );
}
