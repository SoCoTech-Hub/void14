"use server";

import { revalidatePath } from "next/cache";

import {
  createToolCustomLang,
  deleteToolCustomLang,
  updateToolCustomLang,
} from "../api/toolCustomLangs/mutations";
import {
  insertToolCustomLangParams,
  NewToolCustomLangParams,
  ToolCustomLangId,
  toolCustomLangIdSchema,
  UpdateToolCustomLangParams,
  updateToolCustomLangParams,
} from "../db/schema/toolCustomLangs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolCustomLangs = () => revalidatePath("/tool-custom-langs");

export const createToolCustomLangAction = async (
  input: NewToolCustomLangParams,
) => {
  try {
    const payload = insertToolCustomLangParams.parse(input);
    await createToolCustomLang(payload);
    revalidateToolCustomLangs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolCustomLangAction = async (
  input: UpdateToolCustomLangParams,
) => {
  try {
    const payload = updateToolCustomLangParams.parse(input);
    await updateToolCustomLang(payload.id, payload);
    revalidateToolCustomLangs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolCustomLangAction = async (input: ToolCustomLangId) => {
  try {
    const payload = toolCustomLangIdSchema.parse({ id: input });
    await deleteToolCustomLang(payload.id);
    revalidateToolCustomLangs();
  } catch (e) {
    return handleErrors(e);
  }
};
