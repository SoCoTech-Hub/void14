import type { LessonBranchId } from "@soco/lesson-db/schema/lessonBranches";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/lesson-db";
import { db } from "@soco/lesson-db/client";
import {
  lessonBranches,
  lessonBranchIdSchema,
} from "@soco/lesson-db/schema/lessonBranches";
import { lessonPages } from "@soco/lesson-db/schema/lessonPages";
import { lessons } from "@soco/lesson-db/schema/lessons";

export const getLessonBranches = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      lessonBranch: lessonBranches,
      lesson: lessons,
      lessonPage: lessonPages,
    })
    .from(lessonBranches)
    .leftJoin(lessons, eq(lessonBranches.lessonId, lessons.id))
    .leftJoin(lessonPages, eq(lessonBranches.lessonPageId, lessonPages.id))
    .where(eq(lessonBranches.userId, session?.user.id!));
  const l = rows.map((r) => ({
    ...r.lessonBranch,
    lesson: r.lesson,
    lessonPage: r.lessonPage,
  }));
  return { lessonBranches: l };
};

export const getLessonBranchById = async (id: LessonBranchId) => {
  const { session } = await getUserAuth();
  const { id: lessonBranchId } = lessonBranchIdSchema.parse({ id });
  const [row] = await db
    .select({
      lessonBranch: lessonBranches,
      lesson: lessons,
      lessonPage: lessonPages,
    })
    .from(lessonBranches)
    .where(
      and(
        eq(lessonBranches.id, lessonBranchId),
        eq(lessonBranches.userId, session?.user.id!),
      ),
    )
    .leftJoin(lessons, eq(lessonBranches.lessonId, lessons.id))
    .leftJoin(lessonPages, eq(lessonBranches.lessonPageId, lessonPages.id));
  if (row === undefined) return {};
  const l = {
    ...row.lessonBranch,
    lesson: row.lesson,
    lessonPage: row.lessonPage,
  };
  return { lessonBranch: l };
};
