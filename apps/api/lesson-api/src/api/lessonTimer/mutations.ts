import type {
  LessonTimerId,
  NewLessonTimerParams,
  UpdateLessonTimerParams,
} from "@soco/lesson-db/schema/lessonTimer";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/lesson-db";
import { db } from "@soco/lesson-db/client";
import {
  insertLessonTimerSchema,
  lessonTimer,
  lessonTimerIdSchema,
  updateLessonTimerSchema,
} from "@soco/lesson-db/schema/lessonTimer";

export const createLessonTimer = async (lessonTimer: NewLessonTimerParams) => {
  const { session } = await getUserAuth();
  const newLessonTimer = insertLessonTimerSchema.parse({
    ...lessonTimer,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db.insert(lessonTimer).values(newLessonTimer).returning();
    return { lessonTimer: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLessonTimer = async (
  id: LessonTimerId,
  lessonTimer: UpdateLessonTimerParams,
) => {
  const { session } = await getUserAuth();
  const { id: lessonTimerId } = lessonTimerIdSchema.parse({ id });
  const newLessonTimer = updateLessonTimerSchema.parse({
    ...lessonTimer,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .update(lessonTimer)
      .set({ ...newLessonTimer, updatedAt: new Date() })
      .where(
        and(
          eq(lessonTimer.id, lessonTimerId!),
          eq(lessonTimer.userId, session?.user.id!),
        ),
      )
      .returning();
    return { lessonTimer: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLessonTimer = async (id: LessonTimerId) => {
  const { session } = await getUserAuth();
  const { id: lessonTimerId } = lessonTimerIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(lessonTimer)
      .where(
        and(
          eq(lessonTimer.id, lessonTimerId!),
          eq(lessonTimer.userId, session?.user.id!),
        ),
      )
      .returning();
    return { lessonTimer: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
