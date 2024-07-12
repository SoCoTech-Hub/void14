import type { QuizSlotId } from "@soco/quiz-db/schema/quizSlots";
import { eq } from "@soco/quiz-db";
import { db } from "@soco/quiz-db/client";
import { quizes } from "@soco/quiz-db/schema/quizes";
import { quizSlotIdSchema, quizSlots } from "@soco/quiz-db/schema/quizSlots";

export const getQuizSlots = async () => {
  const rows = await db
    .select({ quizSlot: quizSlots, quize: quizes })
    .from(quizSlots)
    .leftJoin(quizes, eq(quizSlots.quizId, quizes.id));
  const q = rows.map((r) => ({ ...r.quizSlot, quize: r.quize }));
  return { quizSlots: q };
};

export const getQuizSlotById = async (id: QuizSlotId) => {
  const { id: quizSlotId } = quizSlotIdSchema.parse({ id });
  const [row] = await db
    .select({ quizSlot: quizSlots, quize: quizes })
    .from(quizSlots)
    .where(eq(quizSlots.id, quizSlotId))
    .leftJoin(quizes, eq(quizSlots.quizId, quizes.id));
  if (row === undefined) return {};
  const q = { ...row.quizSlot, quize: row.quize };
  return { quizSlot: q };
};
