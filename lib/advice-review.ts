import type { Condition, Scenario } from "@/types/study";

export function adviceReview(task: Scenario, condition: Condition) {
  if (task.aiAnswer !== task.expectedAnswer) {
    return {
      label: "The error in the simulated advice was:",
      note: "The recommendation conflicts with the source-supported answer key.",
    };
  }
  if (task.hasClaimFlag && condition === "claim-specific") {
    return {
      label: "The warning questioned this supported claim:",
      note: "This is a simulated false alarm: the targeted warning flagged a claim supported by the lecture. That does not establish why you chose your answer.",
    };
  }
  return {
    label: "The supported claim in the simulated advice was:",
    note: task.hasClaimFlag
      ? "The advice agrees with the lecture. This session used a general reminder; it did not display a targeted claim flag."
      : "The advice agrees with the lecture. This baseline displays the same general reminder in both styles and has no targeted claim flag.",
  };
}
