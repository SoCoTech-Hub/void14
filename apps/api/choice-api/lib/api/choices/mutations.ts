import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  ChoiceId,
  choiceIdSchema,
  choices,
  insertChoiceSchema,
  NewChoiceParams,
  UpdateChoiceParams,
  updateChoiceSchema,
} from "../../db/schema/choices";

export const createChoice = async (choice: NewChoiceParams) => {
  const newChoice = insertChoiceSchema.parse(choice);
  try {
    const [c] = await db.insert(choices).values(newChoice).returning();
    return { choice: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChoice = async (
  id: ChoiceId,
  choice: UpdateChoiceParams,
) => {
  const { id: choiceId } = choiceIdSchema.parse({ id });
  const newChoice = updateChoiceSchema.parse(choice);
  try {
    const [c] = await db
      .update(choices)
      .set({ ...newChoice, updatedAt: new Date() })
      .where(eq(choices.id, choiceId!))
      .returning();
    return { choice: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChoice = async (id: ChoiceId) => {
  const { id: choiceId } = choiceIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(choices)
      .where(eq(choices.id, choiceId!))
      .returning();
    return { choice: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
