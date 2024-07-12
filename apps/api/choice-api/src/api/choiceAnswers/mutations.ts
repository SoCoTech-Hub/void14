import { db } from "@soco/choice-db/client";
import { and, eq } from "@soco/choice-db";
import { 
  type ChoiceAnswerId, 
  type NewChoiceAnswerParams,
  type UpdateChoiceAnswerParams, 
  updateChoiceAnswerSchema,
  insertChoiceAnswerSchema, 
  choiceAnswers,
  choiceAnswerIdSchema 
} from "@soco/choice-db/schema/choiceAnswers";
import { getUserAuth } from "@soco/auth-service";

export const createChoiceAnswer = async (choiceAnswer: NewChoiceAnswerParams) => {
  const { session } = await getUserAuth();
  const newChoiceAnswer = insertChoiceAnswerSchema.parse({ ...choiceAnswer, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(choiceAnswers).values(newChoiceAnswer).returning();
    return { choiceAnswer: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChoiceAnswer = async (id: ChoiceAnswerId, choiceAnswer: UpdateChoiceAnswerParams) => {
  const { session } = await getUserAuth();
  const { id: choiceAnswerId } = choiceAnswerIdSchema.parse({ id });
  const newChoiceAnswer = updateChoiceAnswerSchema.parse({ ...choiceAnswer, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(choiceAnswers)
     .set({...newChoiceAnswer, updatedAt: new Date() })
     .where(and(eq(choiceAnswers.id, choiceAnswerId!), eq(choiceAnswers.userId, session?.user.id!)))
     .returning();
    return { choiceAnswer: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChoiceAnswer = async (id: ChoiceAnswerId) => {
  const { session } = await getUserAuth();
  const { id: choiceAnswerId } = choiceAnswerIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(choiceAnswers).where(and(eq(choiceAnswers.id, choiceAnswerId!), eq(choiceAnswers.userId, session?.user.id!)))
    .returning();
    return { choiceAnswer: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

