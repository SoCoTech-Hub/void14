import type {
  LessonBranchId,
  NewLessonBranchParams,
  UpdateLessonBranchParams,
} from "@soco/lesson-db/schema/lessonBranches";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/lesson-db";
import { db } from "@soco/lesson-db/client";
import {
  insertLessonBranchSchema,
  lessonBranches,
  lessonBranchIdSchema,
  updateLessonBranchSchema,
} from "@soco/lesson-db/schema/lessonBranches";

export const createLessonBranch = async (
  lessonBranch: NewLessonBranchParams,
) => {
  const { session } = await getUserAuth();
  const newLessonBranch = insertLessonBranchSchema.parse({
    ...lessonBranch,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .insert(lessonBranches)
      .values(newLessonBranch)
      .returning();
    return { lessonBranch: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLessonBranch = async (
  id: LessonBranchId,
  lessonBranch: UpdateLessonBranchParams,
) => {
  const { session } = await getUserAuth();
  const { id: lessonBranchId } = lessonBranchIdSchema.parse({ id });
  const newLessonBranch = updateLessonBranchSchema.parse({
    ...lessonBranch,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .update(lessonBranches)
      .set(newLessonBranch)
      .where(
        and(
          eq(lessonBranches.id, lessonBranchId!),
          eq(lessonBranches.userId, session?.user.id!),
        ),
      )
      .returning();
    return { lessonBranch: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLessonBranch = async (id: LessonBranchId) => {
  const { session } = await getUserAuth();
  const { id: lessonBranchId } = lessonBranchIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(lessonBranches)
      .where(
        and(
          eq(lessonBranches.id, lessonBranchId!),
          eq(lessonBranches.userId, session?.user.id!),
        ),
      )
      .returning();
    return { lessonBranch: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
