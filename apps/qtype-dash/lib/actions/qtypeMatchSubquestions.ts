"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeMatchSubquestion,
  deleteQtypeMatchSubquestion,
  updateQtypeMatchSubquestion,
} from "@/lib/api/qtypeMatchSubquestions/mutations";
import {
  QtypeMatchSubquestionId,
  NewQtypeMatchSubquestionParams,
  UpdateQtypeMatchSubquestionParams,
  qtypeMatchSubquestionIdSchema,
  insertQtypeMatchSubquestionParams,
  updateQtypeMatchSubquestionParams,
} from "@/lib/db/schema/qtypeMatchSubquestions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeMatchSubquestions = () => revalidatePath("/qtype-match-subquestions");

export const createQtypeMatchSubquestionAction = async (input: NewQtypeMatchSubquestionParams) => {
  try {
    const payload = insertQtypeMatchSubquestionParams.parse(input);
    await createQtypeMatchSubquestion(payload);
    revalidateQtypeMatchSubquestions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeMatchSubquestionAction = async (input: UpdateQtypeMatchSubquestionParams) => {
  try {
    const payload = updateQtypeMatchSubquestionParams.parse(input);
    await updateQtypeMatchSubquestion(payload.id, payload);
    revalidateQtypeMatchSubquestions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeMatchSubquestionAction = async (input: QtypeMatchSubquestionId) => {
  try {
    const payload = qtypeMatchSubquestionIdSchema.parse({ id: input });
    await deleteQtypeMatchSubquestion(payload.id);
    revalidateQtypeMatchSubquestions();
  } catch (e) {
    return handleErrors(e);
  }
};