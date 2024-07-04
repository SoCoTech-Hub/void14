"use server";

import { revalidatePath } from "next/cache";

import {
  createQtypeMatchOption,
  deleteQtypeMatchOption,
  updateQtypeMatchOption,
} from "../api/qtypeMatchOptions/mutations";
import {
  insertQtypeMatchOptionParams,
  NewQtypeMatchOptionParams,
  QtypeMatchOptionId,
  qtypeMatchOptionIdSchema,
  UpdateQtypeMatchOptionParams,
  updateQtypeMatchOptionParams,
} from "../db/schema/qtypeMatchOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeMatchOptions = () =>
  revalidatePath("/qtype-match-options");

export const createQtypeMatchOptionAction = async (
  input: NewQtypeMatchOptionParams,
) => {
  try {
    const payload = insertQtypeMatchOptionParams.parse(input);
    await createQtypeMatchOption(payload);
    revalidateQtypeMatchOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeMatchOptionAction = async (
  input: UpdateQtypeMatchOptionParams,
) => {
  try {
    const payload = updateQtypeMatchOptionParams.parse(input);
    await updateQtypeMatchOption(payload.id, payload);
    revalidateQtypeMatchOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeMatchOptionAction = async (
  input: QtypeMatchOptionId,
) => {
  try {
    const payload = qtypeMatchOptionIdSchema.parse({ id: input });
    await deleteQtypeMatchOption(payload.id);
    revalidateQtypeMatchOptions();
  } catch (e) {
    return handleErrors(e);
  }
};
