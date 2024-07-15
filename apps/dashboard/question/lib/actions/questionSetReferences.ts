"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionSetReference,
  deleteQuestionSetReference,
  updateQuestionSetReference,
} from "@/lib/api/questionSetReferences/mutations";
import {
  QuestionSetReferenceId,
  NewQuestionSetReferenceParams,
  UpdateQuestionSetReferenceParams,
  questionSetReferenceIdSchema,
  insertQuestionSetReferenceParams,
  updateQuestionSetReferenceParams,
} from "@/lib/db/schema/questionSetReferences";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionSetReferences = () => revalidatePath("/question-set-references");

export const createQuestionSetReferenceAction = async (input: NewQuestionSetReferenceParams) => {
  try {
    const payload = insertQuestionSetReferenceParams.parse(input);
    await createQuestionSetReference(payload);
    revalidateQuestionSetReferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionSetReferenceAction = async (input: UpdateQuestionSetReferenceParams) => {
  try {
    const payload = updateQuestionSetReferenceParams.parse(input);
    await updateQuestionSetReference(payload.id, payload);
    revalidateQuestionSetReferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionSetReferenceAction = async (input: QuestionSetReferenceId) => {
  try {
    const payload = questionSetReferenceIdSchema.parse({ id: input });
    await deleteQuestionSetReference(payload.id);
    revalidateQuestionSetReferences();
  } catch (e) {
    return handleErrors(e);
  }
};
