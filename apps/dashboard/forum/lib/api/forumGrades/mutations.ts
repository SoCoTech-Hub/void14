import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ForumGradeId, 
  type NewForumGradeParams,
  type UpdateForumGradeParams, 
  updateForumGradeSchema,
  insertForumGradeSchema, 
  forumGrades,
  forumGradeIdSchema 
} from "@/lib/db/schema/forumGrades";
import { getUserAuth } from "@/lib/auth/utils";

export const createForumGrade = async (forumGrade: NewForumGradeParams) => {
  const { session } = await getUserAuth();
  const newForumGrade = insertForumGradeSchema.parse({ ...forumGrade, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(forumGrades).values(newForumGrade).returning();
    return { forumGrade: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateForumGrade = async (id: ForumGradeId, forumGrade: UpdateForumGradeParams) => {
  const { session } = await getUserAuth();
  const { id: forumGradeId } = forumGradeIdSchema.parse({ id });
  const newForumGrade = updateForumGradeSchema.parse({ ...forumGrade, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(forumGrades)
     .set({...newForumGrade, updatedAt: new Date() })
     .where(and(eq(forumGrades.id, forumGradeId!), eq(forumGrades.userId, session?.user.id!)))
     .returning();
    return { forumGrade: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteForumGrade = async (id: ForumGradeId) => {
  const { session } = await getUserAuth();
  const { id: forumGradeId } = forumGradeIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(forumGrades).where(and(eq(forumGrades.id, forumGradeId!), eq(forumGrades.userId, session?.user.id!)))
    .returning();
    return { forumGrade: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

