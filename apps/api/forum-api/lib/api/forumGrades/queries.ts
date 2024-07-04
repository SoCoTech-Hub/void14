import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type ForumGradeId, forumGradeIdSchema, forumGrades } from "@/lib/db/schema/forumGrades";

export const getForumGrades = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(forumGrades).where(eq(forumGrades.userId, session?.user.id!));
  const f = rows
  return { forumGrades: f };
};

export const getForumGradeById = async (id: ForumGradeId) => {
  const { session } = await getUserAuth();
  const { id: forumGradeId } = forumGradeIdSchema.parse({ id });
  const [row] = await db.select().from(forumGrades).where(and(eq(forumGrades.id, forumGradeId), eq(forumGrades.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { forumGrade: f };
};


