export type Answer = "yes" | "no" | "not-sure";
export type Condition = "general" | "claim-specific";

export interface Scenario {
  id: string;
  version: string;
  adviceVersion: string;
  notesVersion: string;
  messageVersion: string;
  title: string;
  question: string;
  advice: string;
  aiAnswer: Answer;
  expectedAnswer: Answer;
  erroneousClaim: string;
  explanation: string;
  notes: string;
  warnings: Record<Condition, string>;
  source: {
    filename: string;
    pages: string;
    url: string;
    checked: string;
  };
}

export type TaskVersions = Pick<
  Scenario,
  "id" | "version" | "adviceVersion" | "notesVersion" | "messageVersion"
>;

type EventDetail =
  | { kind: "session-started" }
  | { kind: "initial-answer-committed"; answer: Answer }
  | { kind: "advice-presented" }
  | { kind: "notes-visibility"; open: boolean }
  | { kind: "final-selection-changed"; answer: Answer }
  | { kind: "final-answer-submitted"; answer: Answer };

export type SessionEvent = EventDetail & { id: string; elapsedMs: number };
export type NewSessionEvent = EventDetail;

interface SessionBase {
  sessionId: string;
  condition: Condition;
  task: TaskVersions;
  startedAt: number;
  events: SessionEvent[];
}

export interface SetupState {
  stage: "setup";
  condition: Condition;
}

export interface InitialState extends SessionBase {
  stage: "initial";
  draft: Answer | null;
  showError: boolean;
}

export interface DecisionState extends SessionBase {
  stage: "decision";
  initialAnswer: Answer;
  finalDraft: Answer;
  notesOpen: boolean;
}

export interface ReviewState extends SessionBase {
  stage: "review";
  initialAnswer: Answer;
  finalAnswer: Answer;
}

export type StudyState =
  SetupState | InitialState | DecisionState | ReviewState;

export type StudyAction =
  | { type: "choose-condition"; condition: Condition }
  | { type: "start"; sessionId: string; task: TaskVersions; at: number }
  | { type: "select-initial"; answer: Answer }
  | { type: "commit-initial"; at: number }
  | { type: "advice-presented"; at: number }
  | { type: "set-notes-open"; open: boolean }
  | { type: "notes-rendered"; open: boolean; at: number }
  | { type: "select-final"; answer: Answer; at: number }
  | { type: "submit-final"; at: number }
  | { type: "restart" };
