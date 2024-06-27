"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizaccessSebTemplate,
  deleteQuizaccessSebTemplate,
  updateQuizaccessSebTemplate,
} from "@/lib/api/quizaccessSebTemplates/mutations";
import {
  QuizaccessSebTemplateId,
  NewQuizaccessSebTemplateParams,
  UpdateQuizaccessSebTemplateParams,
  quizaccessSebTemplateIdSchema,
  insertQuizaccessSebTemplateParams,
  updateQuizaccessSebTemplateParams,
} from "@/lib/db/schema/quizaccessSebTemplates";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizaccessSebTemplates = () => revalidatePath("/quizaccess-seb-templates");

export const createQuizaccessSebTemplateAction = async (input: NewQuizaccessSebTemplateParams) => {
  try {
    const payload = insertQuizaccessSebTemplateParams.parse(input);
    await createQuizaccessSebTemplate(payload);
    revalidateQuizaccessSebTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizaccessSebTemplateAction = async (input: UpdateQuizaccessSebTemplateParams) => {
  try {
    const payload = updateQuizaccessSebTemplateParams.parse(input);
    await updateQuizaccessSebTemplate(payload.id, payload);
    revalidateQuizaccessSebTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizaccessSebTemplateAction = async (input: QuizaccessSebTemplateId) => {
  try {
    const payload = quizaccessSebTemplateIdSchema.parse({ id: input });
    await deleteQuizaccessSebTemplate(payload.id);
    revalidateQuizaccessSebTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};