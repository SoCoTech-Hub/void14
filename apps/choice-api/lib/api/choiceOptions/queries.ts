import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ChoiceOptionId, choiceOptionIdSchema, choiceOptions } from "@/lib/db/schema/choiceOptions";
import { choices } from "@/lib/db/schema/choices";

export const getChoiceOptions = async () => {
  const rows = await db.select({ choiceOption: choiceOptions, choice: choices }).from(choiceOptions).leftJoin(choices, eq(choiceOptions.choiceId, choices.id));
  const c = rows .map((r) => ({ ...r.choiceOption, choice: r.choice})); 
  return { choiceOptions: c };
};

export const getChoiceOptionById = async (id: ChoiceOptionId) => {
  const { id: choiceOptionId } = choiceOptionIdSchema.parse({ id });
  const [row] = await db.select({ choiceOption: choiceOptions, choice: choices }).from(choiceOptions).where(eq(choiceOptions.id, choiceOptionId)).leftJoin(choices, eq(choiceOptions.choiceId, choices.id));
  if (row === undefined) return {};
  const c =  { ...row.choiceOption, choice: row.choice } ;
  return { choiceOption: c };
};


