import { eq } from "drizzle-orm";

import type { ChoiceId } from "../db/schema/choices";
import { db } from "../db/index";
import { choiceIdSchema, choices } from "../db/schema/choices";

export const getChoices = async () => {
  const rows = await db.select().from(choices);
  const c = rows;
  return { choices: c };
};

export const getChoiceById = async (id: ChoiceId) => {
  const { id: choiceId } = choiceIdSchema.parse({ id });
  const [row] = await db.select().from(choices).where(eq(choices.id, choiceId));
  if (row === undefined) return {};
  const c = row;
  return { choice: c };
};
