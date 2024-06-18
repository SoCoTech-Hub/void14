"use server";

import { revalidatePath } from "next/cache";
import {
  createQuize,
  deleteQuize,
  updateQuize,
} from "@/lib/api/quizes/mutations";
import {
  QuizeId,
  NewQuizeParams,
  UpdateQuizeParams,
  quizeIdSchema,
  insertQuizeParams,
  updateQuizeParams,
} from "@/lib/db/schema/quizes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizes = () => revalidatePath("/quizes");

export const createQuizeAction = async (input: NewQuizeParams) => {
  try {
    const payload = insertQuizeParams.parse(input);
    await createQuize(payload);
    revalidateQuizes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizeAction = async (input: UpdateQuizeParams) => {
  try {
    const payload = updateQuizeParams.parse(input);
    await updateQuize(payload.id, payload);
    revalidateQuizes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizeAction = async (input: QuizeId) => {
  try {
    const payload = quizeIdSchema.parse({ id: input });
    await deleteQuize(payload.id);
    revalidateQuizes();
  } catch (e) {
    return handleErrors(e);
  }
};