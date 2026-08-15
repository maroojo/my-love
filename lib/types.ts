export type Answer = "yes" | "no";

export interface ResponseRecord {
  id: string;
  answer: Answer;
  createdAt: string;
}