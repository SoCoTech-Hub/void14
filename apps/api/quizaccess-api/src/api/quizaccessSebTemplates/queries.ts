import type { QuizaccessSebTemplateId } from "@soco/quizaccess-db/schema/quizaccessSebTemplates";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/quizaccess-db";
import { db } from "@soco/quizaccess-db/client";
import {
  quizaccessSebTemplateIdSchema,
  quizaccessSebTemplates,
} from "@soco/quizaccess-db/schema/quizaccessSebTemplates";

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
