import type { LessonGradeId } from "@soco/lesson-db/schema/lessonGrades";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/lesson-db";
import { db } from "@soco/lesson-db/client";
import {
  lessonGradeIdSchema,
  lessonGrades,
} from "@soco/lesson-db/schema/lessonGrades";
import { lessons } from "@soco/lesson-db/schema/lessons";

export const getLessonGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ lessonGrade: lessonGrades, lesson: lessons })
    .from(lessonGrades)
    .leftJoin(lessons, eq(lessonGrades.lessonId, lessons.id))
    .where(eq(lessonGrades.userId, session?.user.id!));
  const l = rows.map((r) => ({ ...r.lessonGrade, lesson: r.lesson }));
  return { lessonGrades: l };
};

export const getLessonGradeById = async (id: LessonGradeId) => {
  const { session } = await getUserAuth();
  const { id: lessonGradeId } = lessonGradeIdSchema.parse({ id });
  const [row] = await db
    .select({ lessonGrade: lessonGrades, lesson: lessons })
    .from(lessonGrades)
    .where(
      and(
        eq(lessonGrades.id, lessonGradeId),
        eq(lessonGrades.userId, session?.user.id!),
      ),
    )
    .leftJoin(lessons, eq(lessonGrades.lessonId, lessons.id));
  if (row === undefined) return {};
  const l = { ...row.lessonGrade, lesson: row.lesson };
  return { lessonGrade: l };
};
