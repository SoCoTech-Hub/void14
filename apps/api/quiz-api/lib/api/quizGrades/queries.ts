import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { QuizGradeId } from "../db/schema/quizGrades";
import { db } from "../db/index";
import { quizes } from "../db/schema/quizes";
import { quizGradeIdSchema, quizGrades } from "../db/schema/quizGrades";

export const getQuizGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ quizGrade: quizGrades, quize: quizes })
    .from(quizGrades)
    .leftJoin(quizes, eq(quizGrades.quizId, quizes.id))
    .where(eq(quizGrades.userId, session?.user.id!));
  const q = rows.map((r) => ({ ...r.quizGrade, quize: r.quize }));
  return { quizGrades: q };
};

export const getQuizGradeById = async (id: QuizGradeId) => {
  const { session } = await getUserAuth();
  const { id: quizGradeId } = quizGradeIdSchema.parse({ id });
  const [row] = await db
    .select({ quizGrade: quizGrades, quize: quizes })
    .from(quizGrades)
    .where(
      and(
        eq(quizGrades.id, quizGradeId),
        eq(quizGrades.userId, session?.user.id!),
      ),
    )
    .leftJoin(quizes, eq(quizGrades.quizId, quizes.id));
  if (row === undefined) return {};
  const q = { ...row.quizGrade, quize: row.quize };
  return { quizGrade: q };
};
