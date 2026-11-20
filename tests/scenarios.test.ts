import { describe, expect, it } from "vitest";
import { scenarios, task01, task02, task03 } from "@/content/scenarios";
import { adviceReview } from "@/lib/advice-review";

describe("Advice and warning demonstrations", () => {
  it("keeps the correct-advice baseline separate from the false-alarm manipulation", () => {
    expect(task01.aiAnswer).not.toBe(task01.expectedAnswer);
    expect(task02.aiAnswer).toBe(task02.expectedAnswer);
    expect(task03.aiAnswer).toBe(task03.expectedAnswer);
    expect(task02.hasClaimFlag).toBe(false);
    expect(task03.hasClaimFlag).toBe(true);
    expect(task02.warnings.general).toBe(task02.warnings["claim-specific"]);
    expect(task03.warnings.general).toBe(task02.warnings.general);
    expect(task03.warnings["claim-specific"]).not.toBe(
      task02.warnings["claim-specific"],
    );
    expect(task03.advice).toBe(task02.advice);
    for (const task of scenarios) {
      expect(task.question).toBe(task01.question);
      expect(task.notes).toBe(task01.notes);
      for (const message of Object.values(task.warnings))
        expect(message.trim().split(/\s+/)).toHaveLength(27);
    }
  });

  it("does not call correct advice an error or a general reminder a targeted false alarm", () => {
    expect(adviceReview(task01, "general").label).toContain("error");
    expect(adviceReview(task01, "claim-specific").label).toContain("error");
    for (const condition of ["general", "claim-specific"] as const) {
      expect(adviceReview(task02, condition).label).toContain(
        "supported claim",
      );
      expect(adviceReview(task02, condition).note).not.toContain("false alarm");
    }
    expect(adviceReview(task03, "general").note).not.toContain("false alarm");
    expect(adviceReview(task03, "claim-specific").note).toContain(
      "simulated false alarm",
    );
    expect(adviceReview(task03, "claim-specific").label).not.toContain("error");
  });
});
