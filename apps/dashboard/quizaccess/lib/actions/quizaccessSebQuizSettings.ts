"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizaccessSebQuizSetting,
  deleteQuizaccessSebQuizSetting,
  updateQuizaccessSebQuizSetting,
} from "@/lib/api/quizaccessSebQuizSettings/mutations";
import {
  QuizaccessSebQuizSettingId,
  NewQuizaccessSebQuizSettingParams,
  UpdateQuizaccessSebQuizSettingParams,
  quizaccessSebQuizSettingIdSchema,
  insertQuizaccessSebQuizSettingParams,
  updateQuizaccessSebQuizSettingParams,
} from "@/lib/db/schema/quizaccessSebQuizSettings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizaccessSebQuizSettings = () => revalidatePath("/quizaccess-seb-quiz-settings");

export const createQuizaccessSebQuizSettingAction = async (input: NewQuizaccessSebQuizSettingParams) => {
  try {
    const payload = insertQuizaccessSebQuizSettingParams.parse(input);
    await createQuizaccessSebQuizSetting(payload);
    revalidateQuizaccessSebQuizSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizaccessSebQuizSettingAction = async (input: UpdateQuizaccessSebQuizSettingParams) => {
  try {
    const payload = updateQuizaccessSebQuizSettingParams.parse(input);
    await updateQuizaccessSebQuizSetting(payload.id, payload);
    revalidateQuizaccessSebQuizSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizaccessSebQuizSettingAction = async (input: QuizaccessSebQuizSettingId) => {
  try {
    const payload = quizaccessSebQuizSettingIdSchema.parse({ id: input });
    await deleteQuizaccessSebQuizSetting(payload.id);
    revalidateQuizaccessSebQuizSettings();
  } catch (e) {
    return handleErrors(e);
  }
};