"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionReference,
  deleteQuestionReference,
  updateQuestionReference,
} from "@/lib/api/questionReferences/mutations";
import {
  QuestionReferenceId,
  NewQuestionReferenceParams,
  UpdateQuestionReferenceParams,
  questionReferenceIdSchema,
  insertQuestionReferenceParams,
  updateQuestionReferenceParams,
} from "@/lib/db/schema/questionReferences";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionReferences = () => revalidatePath("/question-references");

export const createQuestionReferenceAction = async (input: NewQuestionReferenceParams) => {
  try {
    const payload = insertQuestionReferenceParams.parse(input);
    await createQuestionReference(payload);
    revalidateQuestionReferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionReferenceAction = async (input: UpdateQuestionReferenceParams) => {
  try {
    const payload = updateQuestionReferenceParams.parse(input);
    await updateQuestionReference(payload.id, payload);
    revalidateQuestionReferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionReferenceAction = async (input: QuestionReferenceId) => {
  try {
    const payload = questionReferenceIdSchema.parse({ id: input });
    await deleteQuestionReference(payload.id);
    revalidateQuestionReferences();
  } catch (e) {
    return handleErrors(e);
  }
};
