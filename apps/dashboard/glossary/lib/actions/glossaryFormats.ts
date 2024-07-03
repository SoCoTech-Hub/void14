"use server";

import { revalidatePath } from "next/cache";
import {
  createGlossaryFormat,
  deleteGlossaryFormat,
  updateGlossaryFormat,
} from "@/lib/api/glossaryFormats/mutations";
import {
  GlossaryFormatId,
  NewGlossaryFormatParams,
  UpdateGlossaryFormatParams,
  glossaryFormatIdSchema,
  insertGlossaryFormatParams,
  updateGlossaryFormatParams,
} from "@/lib/db/schema/glossaryFormats";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGlossaryFormats = () => revalidatePath("/glossary-formats");

export const createGlossaryFormatAction = async (input: NewGlossaryFormatParams) => {
  try {
    const payload = insertGlossaryFormatParams.parse(input);
    await createGlossaryFormat(payload);
    revalidateGlossaryFormats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGlossaryFormatAction = async (input: UpdateGlossaryFormatParams) => {
  try {
    const payload = updateGlossaryFormatParams.parse(input);
    await updateGlossaryFormat(payload.id, payload);
    revalidateGlossaryFormats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGlossaryFormatAction = async (input: GlossaryFormatId) => {
  try {
    const payload = glossaryFormatIdSchema.parse({ id: input });
    await deleteGlossaryFormat(payload.id);
    revalidateGlossaryFormats();
  } catch (e) {
    return handleErrors(e);
  }
};