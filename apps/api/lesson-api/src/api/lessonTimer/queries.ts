import { and, eq } from "drizzle-orm";

import type { LessonTimerId } from "@soco/lesson-db/schema/lessonTimer";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/lesson-db/index";
import { lessons } from "@soco/lesson-db/schema/lessons";
import {
  lessonTimer,
  lessonTimerIdSchema,
} from "@soco/lesson-db/schema/lessonTimer";

export const getLessonTimers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ lessonTimer: lessonTimer, lesson: lessons })
    .from(lessonTimer)
    .leftJoin(lessons, eq(lessonTimer.lessonId, lessons.id))
    .where(eq(lessonTimer.userId, session?.user.id!));
  const l = rows.map((r) => ({ ...r.lessonTimer, lesson: r.lesson }));
  return { lessonTimer: l };
};

export const getLessonTimerById = async (id: LessonTimerId) => {
  const { session } = await getUserAuth();
  const { id: lessonTimerId } = lessonTimerIdSchema.parse({ id });
  const [row] = await db
    .select({ lessonTimer: lessonTimer, lesson: lessons })
    .from(lessonTimer)
    .where(
      and(
        eq(lessonTimer.id, lessonTimerId),
        eq(lessonTimer.userId, session?.user.id!),
      ),
    )
    .leftJoin(lessons, eq(lessonTimer.lessonId, lessons.id));
  if (row === undefined) return {};
  const l = { ...row.lessonTimer, lesson: row.lesson };
  return { lessonTimer: l };
};
