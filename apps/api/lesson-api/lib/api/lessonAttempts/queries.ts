import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type LessonAttemptId, lessonAttemptIdSchema, lessonAttempts } from "@/lib/db/schema/lessonAttempts";
import { lessonAnswers } from "@/lib/db/schema/lessonAnswers";
import { lessonPages } from "@/lib/db/schema/lessonPages";
import { lessons } from "@/lib/db/schema/lessons";

export const getLessonAttempts = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ lessonAttempt: lessonAttempts, lessonAnswer: lessonAnswers, lessonPage: lessonPages, lesson: lessons }).from(lessonAttempts).leftJoin(lessonAnswers, eq(lessonAttempts.lessonAnswerId, lessonAnswers.id)).leftJoin(lessonPages, eq(lessonAttempts.lessonPageId, lessonPages.id)).leftJoin(lessons, eq(lessonAttempts.lessonId, lessons.id)).where(eq(lessonAttempts.userId, session?.user.id!));
  const l = rows .map((r) => ({ ...r.lessonAttempt, lessonAnswer: r.lessonAnswer, lessonPage: r.lessonPage, lesson: r.lesson})); 
  return { lessonAttempts: l };
};

export const getLessonAttemptById = async (id: LessonAttemptId) => {
  const { session } = await getUserAuth();
  const { id: lessonAttemptId } = lessonAttemptIdSchema.parse({ id });
  const [row] = await db.select({ lessonAttempt: lessonAttempts, lessonAnswer: lessonAnswers, lessonPage: lessonPages, lesson: lessons }).from(lessonAttempts).where(and(eq(lessonAttempts.id, lessonAttemptId), eq(lessonAttempts.userId, session?.user.id!))).leftJoin(lessonAnswers, eq(lessonAttempts.lessonAnswerId, lessonAnswers.id)).leftJoin(lessonPages, eq(lessonAttempts.lessonPageId, lessonPages.id)).leftJoin(lessons, eq(lessonAttempts.lessonId, lessons.id));
  if (row === undefined) return {};
  const l =  { ...row.lessonAttempt, lessonAnswer: row.lessonAnswer, lessonPage: row.lessonPage, lesson: row.lesson } ;
  return { lessonAttempt: l };
};


