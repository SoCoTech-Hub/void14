import { db } from "@soco/choice-db/client";
import { eq, and } from "@soco/choice-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type ChoiceAnswerId, choiceAnswerIdSchema, choiceAnswers } from "@soco/choice-db/schema/choiceAnswers";
import { choiceOptions } from "@soco/choice-db/schema/choiceOptions";
import { choices } from "@soco/choice-db/schema/choices";

export const getChoiceAnswers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ choiceAnswer: choiceAnswers, choiceOption: choiceOptions, choice: choices }).from(choiceAnswers).leftJoin(choiceOptions, eq(choiceAnswers.choiceOptionId, choiceOptions.id)).leftJoin(choices, eq(choiceAnswers.choiceId, choices.id)).where(eq(choiceAnswers.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.choiceAnswer, choiceOption: r.choiceOption, choice: r.choice})); 
  return { choiceAnswers: c };
};

export const getChoiceAnswerById = async (id: ChoiceAnswerId) => {
  const { session } = await getUserAuth();
  const { id: choiceAnswerId } = choiceAnswerIdSchema.parse({ id });
  const [row] = await db.select({ choiceAnswer: choiceAnswers, choiceOption: choiceOptions, choice: choices }).from(choiceAnswers).where(and(eq(choiceAnswers.id, choiceAnswerId), eq(choiceAnswers.userId, session?.user.id!))).leftJoin(choiceOptions, eq(choiceAnswers.choiceOptionId, choiceOptions.id)).leftJoin(choices, eq(choiceAnswers.choiceId, choices.id));
  if (row === undefined) return {};
  const c =  { ...row.choiceAnswer, choiceOption: row.choiceOption, choice: row.choice } ;
  return { choiceAnswer: c };
};


