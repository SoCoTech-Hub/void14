"use server";

import { revalidatePath } from "next/cache";

import {
  createQtypeMultichoiceOption,
  deleteQtypeMultichoiceOption,
  updateQtypeMultichoiceOption,
} from "../api/qtypeMultichoiceOptions/mutations";
import {
  insertQtypeMultichoiceOptionParams,
  NewQtypeMultichoiceOptionParams,
  QtypeMultichoiceOptionId,
  qtypeMultichoiceOptionIdSchema,
  UpdateQtypeMultichoiceOptionParams,
  updateQtypeMultichoiceOptionParams,
} from "../db/schema/qtypeMultichoiceOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeMultichoiceOptions = () =>
  revalidatePath("/qtype-multichoice-options");

export const createQtypeMultichoiceOptionAction = async (
  input: NewQtypeMultichoiceOptionParams,
) => {
  try {
    const payload = insertQtypeMultichoiceOptionParams.parse(input);
    await createQtypeMultichoiceOption(payload);
    revalidateQtypeMultichoiceOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeMultichoiceOptionAction = async (
  input: UpdateQtypeMultichoiceOptionParams,
) => {
  try {
    const payload = updateQtypeMultichoiceOptionParams.parse(input);
    await updateQtypeMultichoiceOption(payload.id, payload);
    revalidateQtypeMultichoiceOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeMultichoiceOptionAction = async (
  input: QtypeMultichoiceOptionId,
) => {
  try {
    const payload = qtypeMultichoiceOptionIdSchema.parse({ id: input });
    await deleteQtypeMultichoiceOption(payload.id);
    revalidateQtypeMultichoiceOptions();
  } catch (e) {
    return handleErrors(e);
  }
};
