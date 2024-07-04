"use server";

import { revalidatePath } from "next/cache";

import {
  createGlossary,
  deleteGlossary,
  updateGlossary,
} from "../api/glossaries/mutations";
import {
  GlossaryId,
  glossaryIdSchema,
  insertGlossaryParams,
  NewGlossaryParams,
  UpdateGlossaryParams,
  updateGlossaryParams,
} from "../db/schema/glossaries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGlossaries = () => revalidatePath("/glossaries");

export const createGlossaryAction = async (input: NewGlossaryParams) => {
  try {
    const payload = insertGlossaryParams.parse(input);
    await createGlossary(payload);
    revalidateGlossaries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGlossaryAction = async (input: UpdateGlossaryParams) => {
  try {
    const payload = updateGlossaryParams.parse(input);
    await updateGlossary(payload.id, payload);
    revalidateGlossaries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGlossaryAction = async (input: GlossaryId) => {
  try {
    const payload = glossaryIdSchema.parse({ id: input });
    await deleteGlossary(payload.id);
    revalidateGlossaries();
  } catch (e) {
    return handleErrors(e);
  }
};
