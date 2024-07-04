import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { QuizaccessSebTemplateId } from "../db/schema/quizaccessSebTemplates";
import { db } from "../db/index";
import {
  quizaccessSebTemplateIdSchema,
  quizaccessSebTemplates,
} from "../db/schema/quizaccessSebTemplates";

export const getQuizaccessSebTemplates = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(quizaccessSebTemplates)
    .where(eq(quizaccessSebTemplates.userId, session?.user.id!));
  const q = rows;
  return { quizaccessSebTemplates: q };
};

export const getQuizaccessSebTemplateById = async (
  id: QuizaccessSebTemplateId,
) => {
  const { session } = await getUserAuth();
  const { id: quizaccessSebTemplateId } = quizaccessSebTemplateIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(quizaccessSebTemplates)
    .where(
      and(
        eq(quizaccessSebTemplates.id, quizaccessSebTemplateId),
        eq(quizaccessSebTemplates.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const q = row;
  return { quizaccessSebTemplate: q };
};