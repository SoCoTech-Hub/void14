"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeShortanswerOption,
  deleteQtypeShortanswerOption,
  updateQtypeShortanswerOption,
} from "@/lib/api/qtypeShortanswerOptions/mutations";
import {
  QtypeShortanswerOptionId,
  NewQtypeShortanswerOptionParams,
  UpdateQtypeShortanswerOptionParams,
  qtypeShortanswerOptionIdSchema,
  insertQtypeShortanswerOptionParams,
  updateQtypeShortanswerOptionParams,
} from "@/lib/db/schema/qtypeShortanswerOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeShortanswerOptions = () => revalidatePath("/qtype-shortanswer-options");

export const createQtypeShortanswerOptionAction = async (input: NewQtypeShortanswerOptionParams) => {
  try {
    const payload = insertQtypeShortanswerOptionParams.parse(input);
    await createQtypeShortanswerOption(payload);
    revalidateQtypeShortanswerOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeShortanswerOptionAction = async (input: UpdateQtypeShortanswerOptionParams) => {
  try {
    const payload = updateQtypeShortanswerOptionParams.parse(input);
    await updateQtypeShortanswerOption(payload.id, payload);
    revalidateQtypeShortanswerOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeShortanswerOptionAction = async (input: QtypeShortanswerOptionId) => {
  try {
    const payload = qtypeShortanswerOptionIdSchema.parse({ id: input });
    await deleteQtypeShortanswerOption(payload.id);
    revalidateQtypeShortanswerOptions();
  } catch (e) {
    return handleErrors(e);
  }
};