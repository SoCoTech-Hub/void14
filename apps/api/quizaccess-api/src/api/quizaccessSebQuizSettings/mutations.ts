import type {
  NewQuizaccessSebQuizSettingParams,
  QuizaccessSebQuizSettingId,
  UpdateQuizaccessSebQuizSettingParams,
} from "@soco/quizaccess-db/schema/quizaccessSebQuizSettings";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/quizaccess-db";
import { db } from "@soco/quizaccess-db/client";
import {
  insertQuizaccessSebQuizSettingSchema,
  quizaccessSebQuizSettingIdSchema,
  quizaccessSebQuizSettings,
  updateQuizaccessSebQuizSettingSchema,
} from "@soco/quizaccess-db/schema/quizaccessSebQuizSettings";

export const createQuizaccessSebQuizSetting = async (
  quizaccessSebQuizSetting: NewQuizaccessSebQuizSettingParams,
) => {
  const { session } = await getUserAuth();
  const newQuizaccessSebQuizSetting =
    insertQuizaccessSebQuizSettingSchema.parse({
      ...quizaccessSebQuizSetting,
      userId: session?.user.id!,
    });
  try {
    const [q] = await db
      .insert(quizaccessSebQuizSettings)
      .values(newQuizaccessSebQuizSetting)
      .returning();
    return { quizaccessSebQuizSetting: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizaccessSebQuizSetting = async (
  id: QuizaccessSebQuizSettingId,
  quizaccessSebQuizSetting: UpdateQuizaccessSebQuizSettingParams,
) => {
  const { session } = await getUserAuth();
  const { id: quizaccessSebQuizSettingId } =
    quizaccessSebQuizSettingIdSchema.parse({ id });
  const newQuizaccessSebQuizSetting =
    updateQuizaccessSebQuizSettingSchema.parse({
      ...quizaccessSebQuizSetting,
      userId: session?.user.id!,
    });
  try {
    const [q] = await db
      .update(quizaccessSebQuizSettings)
      .set({ ...newQuizaccessSebQuizSetting, updatedAt: new Date() })
      .where(
        and(
          eq(quizaccessSebQuizSettings.id, quizaccessSebQuizSettingId!),
          eq(quizaccessSebQuizSettings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { quizaccessSebQuizSetting: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizaccessSebQuizSetting = async (
  id: QuizaccessSebQuizSettingId,
) => {
  const { session } = await getUserAuth();
  const { id: quizaccessSebQuizSettingId } =
    quizaccessSebQuizSettingIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(quizaccessSebQuizSettings)
      .where(
        and(
          eq(quizaccessSebQuizSettings.id, quizaccessSebQuizSettingId!),
          eq(quizaccessSebQuizSettings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { quizaccessSebQuizSetting: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
