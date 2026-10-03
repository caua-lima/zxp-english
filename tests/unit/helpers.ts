import { cloze, mc, dict } from "@/content/builders";
import type { Exercise } from "@/content/schema";
import { emptyState } from "@/engine/defaults";
import { gradeResponse, type Response } from "@/engine/grading";
import type { ProgressState } from "@/engine/model";
import type { RecordAttemptInput } from "@/state/actions";

export const TZ = "America/Sao_Paulo";
export const T0 = new Date("2026-10-01T15:00:00Z"); // 12:00 em São Paulo

export function fresh(tz = TZ, at: Date = T0): ProgressState {
  const s = emptyState(at.toISOString(), tz);
  return { ...s, profile: { ...s.profile, onboarded: true } };
}

export const exCloze: Exercise = { ...cloze("a1-u01-l1-e4", "Good ___, Mr. Silva!", ["afternoon"], "Às 3 da tarde, Good afternoon.", { c: ["a1-u01:good-afternoon"], s: "vocabulary" }) };
export const exMc: Exercise = { ...mc("a1-u01-l1-e1", "Bom dia?", ["Good morning!", "Good night!"], 0, "De manhã usamos Good morning.", { c: ["a1-u01:good-morning"] }) };
export const exDict: Exercise = { ...dict("a1-u01-l1-e6", "Good evening.", "Era Good evening, cumprimento da noite.", { c: ["a1-u01:good-evening"] }) };

export function attemptInput(
  ex: Exercise,
  response: Response,
  over: Partial<RecordAttemptInput> = {},
): RecordAttemptInput {
  return {
    attemptId: `s1:${ex.id}:1`,
    exercise: ex,
    context: "lesson",
    ref: "a1-u01-l1",
    grade: gradeResponse(ex, response),
    hints: 0,
    revealed: false,
    ...over,
  };
}
