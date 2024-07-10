import { db } from "@soco/quizaccess-db/client";
import { and, eq } from "@soco/quizaccess-db";
import { 
  QuizaccessSebTemplateId, 
  NewQuizaccessSebTemplateParams,
  UpdateQuizaccessSebTemplateParams, 
  updateQuizaccessSebTemplateSchema,
  insertQuizaccessSebTemplateSchema, 
  quizaccessSebTemplates,
  quizaccessSebTemplateIdSchema 
} from "@soco/quizaccess-db/schema/quizaccessSebTemplates";
import { getUserAuth } from "@/lib/auth/utils";

export const createQuizaccessSebTemplate = async (quizaccessSebTemplate: NewQuizaccessSebTemplateParams) => {
  const { session } = await getUserAuth();
  const newQuizaccessSebTemplate = insertQuizaccessSebTemplateSchema.parse({ ...quizaccessSebTemplate, userId: session?.user.id! });
  try {
    const [q] =  await db.insert(quizaccessSebTemplates).values(newQuizaccessSebTemplate).returning();
    return { quizaccessSebTemplate: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizaccessSebTemplate = async (id: QuizaccessSebTemplateId, quizaccessSebTemplate: UpdateQuizaccessSebTemplateParams) => {
  const { session } = await getUserAuth();
  const { id: quizaccessSebTemplateId } = quizaccessSebTemplateIdSchema.parse({ id });
  const newQuizaccessSebTemplate = updateQuizaccessSebTemplateSchema.parse({ ...quizaccessSebTemplate, userId: session?.user.id! });
  try {
    const [q] =  await db
     .update(quizaccessSebTemplates)
     .set({...newQuizaccessSebTemplate, updatedAt: new Date() })
     .where(and(eq(quizaccessSebTemplates.id, quizaccessSebTemplateId!), eq(quizaccessSebTemplates.userId, session?.user.id!)))
     .returning();
    return { quizaccessSebTemplate: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizaccessSebTemplate = async (id: QuizaccessSebTemplateId) => {
  const { session } = await getUserAuth();
  const { id: quizaccessSebTemplateId } = quizaccessSebTemplateIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizaccessSebTemplates).where(and(eq(quizaccessSebTemplates.id, quizaccessSebTemplateId!), eq(quizaccessSebTemplates.userId, session?.user.id!)))
    .returning();
    return { quizaccessSebTemplate: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

