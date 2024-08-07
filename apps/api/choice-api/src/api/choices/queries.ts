import type { ChoiceId } from "@soco/choice-db/schema/choices";
import { eq } from "@soco/choice-db";
import { db } from "@soco/choice-db/client";
import { choiceIdSchema, choices } from "@soco/choice-db/schema/choices";

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
