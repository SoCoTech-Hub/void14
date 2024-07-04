"use server";

import { revalidatePath } from "next/cache";

import {
  createMassMailList,
  deleteMassMailList,
  updateMassMailList,
} from "../api/massMailLists/mutations";
import {
  insertMassMailListParams,
  MassMailListId,
  massMailListIdSchema,
  NewMassMailListParams,
  UpdateMassMailListParams,
  updateMassMailListParams,
} from "../db/schema/massMailLists";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMassMailLists = () => revalidatePath("/mass-mail-lists");

export const createMassMailListAction = async (
  input: NewMassMailListParams,
) => {
  try {
    const payload = insertMassMailListParams.parse(input);
    await createMassMailList(payload);
    revalidateMassMailLists();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMassMailListAction = async (
  input: UpdateMassMailListParams,
) => {
  try {
    const payload = updateMassMailListParams.parse(input);
    await updateMassMailList(payload.id, payload);
    revalidateMassMailLists();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMassMailListAction = async (input: MassMailListId) => {
  try {
    const payload = massMailListIdSchema.parse({ id: input });
    await deleteMassMailList(payload.id);
    revalidateMassMailLists();
  } catch (e) {
    return handleErrors(e);
  }
};
