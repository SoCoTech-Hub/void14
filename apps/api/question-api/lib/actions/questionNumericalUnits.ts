"use server";

import { revalidatePath } from "next/cache";

import {
  createQuestionNumericalUnit,
  deleteQuestionNumericalUnit,
  updateQuestionNumericalUnit,
} from "../api/questionNumericalUnits/mutations";
import {
  insertQuestionNumericalUnitParams,
  NewQuestionNumericalUnitParams,
  QuestionNumericalUnitId,
  questionNumericalUnitIdSchema,
  UpdateQuestionNumericalUnitParams,
  updateQuestionNumericalUnitParams,
} from "../db/schema/questionNumericalUnits";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionNumericalUnits = () =>
  revalidatePath("/question-numerical-units");

export const createQuestionNumericalUnitAction = async (
  input: NewQuestionNumericalUnitParams,
) => {
  try {
    const payload = insertQuestionNumericalUnitParams.parse(input);
    await createQuestionNumericalUnit(payload);
    revalidateQuestionNumericalUnits();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionNumericalUnitAction = async (
  input: UpdateQuestionNumericalUnitParams,
) => {
  try {
    const payload = updateQuestionNumericalUnitParams.parse(input);
    await updateQuestionNumericalUnit(payload.id, payload);
    revalidateQuestionNumericalUnits();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionNumericalUnitAction = async (
  input: QuestionNumericalUnitId,
) => {
  try {
    const payload = questionNumericalUnitIdSchema.parse({ id: input });
    await deleteQuestionNumericalUnit(payload.id);
    revalidateQuestionNumericalUnits();
  } catch (e) {
    return handleErrors(e);
  }
};
