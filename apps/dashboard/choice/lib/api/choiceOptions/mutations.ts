import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ChoiceOptionId, 
  type NewChoiceOptionParams,
  type UpdateChoiceOptionParams, 
  updateChoiceOptionSchema,
  insertChoiceOptionSchema, 
  choiceOptions,
  choiceOptionIdSchema 
} from "@/lib/db/schema/choiceOptions";

export const createChoiceOption = async (choiceOption: NewChoiceOptionParams) => {
  const newChoiceOption = insertChoiceOptionSchema.parse(choiceOption);
  try {
    const [c] =  await db.insert(choiceOptions).values(newChoiceOption).returning();
    return { choiceOption: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChoiceOption = async (id: ChoiceOptionId, choiceOption: UpdateChoiceOptionParams) => {
  const { id: choiceOptionId } = choiceOptionIdSchema.parse({ id });
  const newChoiceOption = updateChoiceOptionSchema.parse(choiceOption);
  try {
    const [c] =  await db
     .update(choiceOptions)
     .set({...newChoiceOption, updatedAt: new Date() })
     .where(eq(choiceOptions.id, choiceOptionId!))
     .returning();
    return { choiceOption: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChoiceOption = async (id: ChoiceOptionId) => {
  const { id: choiceOptionId } = choiceOptionIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(choiceOptions).where(eq(choiceOptions.id, choiceOptionId!))
    .returning();
    return { choiceOption: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

