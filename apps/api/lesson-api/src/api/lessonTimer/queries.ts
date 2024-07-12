import { db } from "@soco/lesson-db/client";
import { eq, and } from "@soco/lesson-db";
import { getUserAuth } from "@soco/auth-service";
import { type LessonTimerId, lessonTimerIdSchema, lessonTimer } from "@soco/lesson-db/schema/lessonTimer";
import { lessons } from "@soco/lesson-db/schema/lessons";

export const getLessonTimers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ lessonTimer: lessonTimer, lesson: lessons }).from(lessonTimer).leftJoin(lessons, eq(lessonTimer.lessonId, lessons.id)).where(eq(lessonTimer.userId, session?.user.id!));
  const l = rows .map((r) => ({ ...r.lessonTimer, lesson: r.lesson})); 
  return { lessonTimer: l };
};

export const getLessonTimerById = async (id: LessonTimerId) => {
  const { session } = await getUserAuth();
  const { id: lessonTimerId } = lessonTimerIdSchema.parse({ id });
  const [row] = await db.select({ lessonTimer: lessonTimer, lesson: lessons }).from(lessonTimer).where(and(eq(lessonTimer.id, lessonTimerId), eq(lessonTimer.userId, session?.user.id!))).leftJoin(lessons, eq(lessonTimer.lessonId, lessons.id));
  if (row === undefined) return {};
  const l =  { ...row.lessonTimer, lesson: row.lesson } ;
  return { lessonTimer: l };
};


