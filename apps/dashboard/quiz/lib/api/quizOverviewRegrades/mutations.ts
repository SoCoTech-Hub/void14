import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type QuizOverviewRegradeId, 
  type NewQuizOverviewRegradeParams,
  type UpdateQuizOverviewRegradeParams, 
  updateQuizOverviewRegradeSchema,
  insertQuizOverviewRegradeSchema, 
  quizOverviewRegrades,
  quizOverviewRegradeIdSchema 
} from "@/lib/db/schema/quizOverviewRegrades";

export const createQuizOverviewRegrade = async (quizOverviewRegrade: NewQuizOverviewRegradeParams) => {
  const newQuizOverviewRegrade = insertQuizOverviewRegradeSchema.parse(quizOverviewRegrade);
  try {
    const [q] =  await db.insert(quizOverviewRegrades).values(newQuizOverviewRegrade).returning();
    return { quizOverviewRegrade: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizOverviewRegrade = async (id: QuizOverviewRegradeId, quizOverviewRegrade: UpdateQuizOverviewRegradeParams) => {
  const { id: quizOverviewRegradeId } = quizOverviewRegradeIdSchema.parse({ id });
  const newQuizOverviewRegrade = updateQuizOverviewRegradeSchema.parse(quizOverviewRegrade);
  try {
    const [q] =  await db
     .update(quizOverviewRegrades)
     .set({...newQuizOverviewRegrade, updatedAt: new Date() })
     .where(eq(quizOverviewRegrades.id, quizOverviewRegradeId!))
     .returning();
    return { quizOverviewRegrade: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizOverviewRegrade = async (id: QuizOverviewRegradeId) => {
  const { id: quizOverviewRegradeId } = quizOverviewRegradeIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizOverviewRegrades).where(eq(quizOverviewRegrades.id, quizOverviewRegradeId!))
    .returning();
    return { quizOverviewRegrade: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

