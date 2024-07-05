import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertLessonGradeSchema,
  LessonGradeId,
  lessonGradeIdSchema,
  lessonGrades,
  NewLessonGradeParams,
  UpdateLessonGradeParams,
  updateLessonGradeSchema,
} from "../../db/schema/lessonGrades";

export const createLessonGrade = async (lessonGrade: NewLessonGradeParams) => {
  const { session } = await getUserAuth();
  const newLessonGrade = insertLessonGradeSchema.parse({
    ...lessonGrade,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .insert(lessonGrades)
      .values(newLessonGrade)
      .returning();
    return { lessonGrade: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLessonGrade = async (
  id: LessonGradeId,
  lessonGrade: UpdateLessonGradeParams,
) => {
  const { session } = await getUserAuth();
  const { id: lessonGradeId } = lessonGradeIdSchema.parse({ id });
  const newLessonGrade = updateLessonGradeSchema.parse({
    ...lessonGrade,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .update(lessonGrades)
      .set(newLessonGrade)
      .where(
        and(
          eq(lessonGrades.id, lessonGradeId!),
          eq(lessonGrades.userId, session?.user.id!),
        ),
      )
      .returning();
    return { lessonGrade: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLessonGrade = async (id: LessonGradeId) => {
  const { session } = await getUserAuth();
  const { id: lessonGradeId } = lessonGradeIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(lessonGrades)
      .where(
        and(
          eq(lessonGrades.id, lessonGradeId!),
          eq(lessonGrades.userId, session?.user.id!),
        ),
      )
      .returning();
    return { lessonGrade: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
