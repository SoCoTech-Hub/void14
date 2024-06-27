import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CourseModulesCompletionId, courseModulesCompletionIdSchema, courseModulesCompletions } from "@/lib/db/schema/courseModulesCompletions";

export const getCourseModulesCompletions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(courseModulesCompletions).where(eq(courseModulesCompletions.userId, session?.user.id!));
  const c = rows
  return { courseModulesCompletions: c };
};

export const getCourseModulesCompletionById = async (id: CourseModulesCompletionId) => {
  const { session } = await getUserAuth();
  const { id: courseModulesCompletionId } = courseModulesCompletionIdSchema.parse({ id });
  const [row] = await db.select().from(courseModulesCompletions).where(and(eq(courseModulesCompletions.id, courseModulesCompletionId), eq(courseModulesCompletions.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { courseModulesCompletion: c };
};


