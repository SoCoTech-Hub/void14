"use server";

import { revalidatePath } from "next/cache";

import {
  createGlossaryAlias,
  deleteGlossaryAlias,
  updateGlossaryAlias,
} from "../api/glossaryAliases/mutations";
import {
  GlossaryAliasId,
  glossaryAliasIdSchema,
  insertGlossaryAliasParams,
  NewGlossaryAliasParams,
  UpdateGlossaryAliasParams,
  updateGlossaryAliasParams,
} from "../db/schema/glossaryAliases";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGlossaryAliases = () => revalidatePath("/glossary-aliases");

export const createGlossaryAliasAction = async (
  input: NewGlossaryAliasParams,
) => {
  try {
    const payload = insertGlossaryAliasParams.parse(input);
    await createGlossaryAlias(payload);
    revalidateGlossaryAliases();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGlossaryAliasAction = async (
  input: UpdateGlossaryAliasParams,
) => {
  try {
    const payload = updateGlossaryAliasParams.parse(input);
    await updateGlossaryAlias(payload.id, payload);
    revalidateGlossaryAliases();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGlossaryAliasAction = async (input: GlossaryAliasId) => {
  try {
    const payload = glossaryAliasIdSchema.parse({ id: input });
    await deleteGlossaryAlias(payload.id);
    revalidateGlossaryAliases();
  } catch (e) {
    return handleErrors(e);
  }
};
