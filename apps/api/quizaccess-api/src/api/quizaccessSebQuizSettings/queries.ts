import { db } from "@soco/quizaccess-db/client";
import { eq, and } from "@soco/quizaccess-db";
import { getUserAuth } from "@soco/auth-service";
import { type QuizaccessSebQuizSettingId, quizaccessSebQuizSettingIdSchema, quizaccessSebQuizSettings } from "@soco/quizaccess-db/schema/quizaccessSebQuizSettings";
import { quizaccessSebTemplates } from "@soco/quizaccess-db/schema/quizaccessSebTemplates";

export const getQuizaccessSebQuizSettings = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ quizaccessSebQuizSetting: quizaccessSebQuizSettings, quizaccessSebTemplate: quizaccessSebTemplates }).from(quizaccessSebQuizSettings).leftJoin(quizaccessSebTemplates, eq(quizaccessSebQuizSettings.quizaccessSebTemplateId, quizaccessSebTemplates.id)).where(eq(quizaccessSebQuizSettings.userId, session?.user.id!));
  const q = rows .map((r) => ({ ...r.quizaccessSebQuizSetting, quizaccessSebTemplate: r.quizaccessSebTemplate})); 
  return { quizaccessSebQuizSettings: q };
};

export const getQuizaccessSebQuizSettingById = async (id: QuizaccessSebQuizSettingId) => {
  const { session } = await getUserAuth();
  const { id: quizaccessSebQuizSettingId } = quizaccessSebQuizSettingIdSchema.parse({ id });
  const [row] = await db.select({ quizaccessSebQuizSetting: quizaccessSebQuizSettings, quizaccessSebTemplate: quizaccessSebTemplates }).from(quizaccessSebQuizSettings).where(and(eq(quizaccessSebQuizSettings.id, quizaccessSebQuizSettingId), eq(quizaccessSebQuizSettings.userId, session?.user.id!))).leftJoin(quizaccessSebTemplates, eq(quizaccessSebQuizSettings.quizaccessSebTemplateId, quizaccessSebTemplates.id));
  if (row === undefined) return {};
  const q =  { ...row.quizaccessSebQuizSetting, quizaccessSebTemplate: row.quizaccessSebTemplate } ;
  return { quizaccessSebQuizSetting: q };
};


