import type { Answer, Condition, Scenario } from "@/types/study";

export const answerOptions: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
];

export const conditions: {
  value: Condition;
  label: string;
  description: string;
}[] = [
  {
    value: "general",
    label: "General reminder",
    description: "A caution about the explanation as a whole.",
  },
  {
    value: "claim-specific",
    label: "Claim-specific message",
    description: "A caution naming one particular claim.",
  },
];

// Hand-authored scenario content, not a response or warning from a live model.
export const task01: Scenario = {
  id: "task-01",
  version: "1",
  adviceVersion: "1",
  notesVersion: "1",
  messageVersion: "1",
  title: "Sources & evidence",
  question:
    "An AI study assistant gives an answer and links to a real, up-to-date lecture passage. Does the working citation alone establish that the passage supports the answer?",
  advice:
    "A citation points you to a source passage. Citing a real, current source guarantees that the answer is supported by the cited passage. Therefore, choose Yes.",
  aiAnswer: "yes",
  expectedAnswer: "no",
  erroneousClaim:
    "Citing a real, current source guarantees that the answer is supported by the cited passage.",
  explanation:
    "A real, current passage can be cited for a claim it does not support. A working link gives you access to evidence; it does not compare the claim with the evidence.",
  notes:
    "A citation gives a route to a source passage. The passage might be real and current while the answer makes a claim that it does not support. Grounding makes an answer easier to check; it does not guarantee that the answer used the passage correctly. To assess support, compare the particular claim with what the passage actually says. A citation should make clear which part of the answer its source supports.",
  warnings: {
    general:
      "This explanation may contain errors, even where its claims sound clear and convincing. You can consult the lecture notes before deciding. This warning may itself be mistaken.",
    "claim-specific":
      "The claim that citing a real, current source guarantees support may be mistaken. You can consult the lecture notes before deciding. This warning may itself be mistaken.",
  },
  source: {
    filename: "W04_L11_Retrieval_Grounding_and_Provenance.pdf",
    pages: "5, 8 and 10",
    url: "https://canvas.bham.ac.uk/courses/90253/files/22521218",
    checked: "17 November 2026",
  },
};
