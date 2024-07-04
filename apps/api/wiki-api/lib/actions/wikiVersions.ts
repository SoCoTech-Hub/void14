"use server";

import { revalidatePath } from "next/cache";

import {
  createWikiVersion,
  deleteWikiVersion,
  updateWikiVersion,
} from "../api/wikiVersions/mutations";
import {
  insertWikiVersionParams,
  NewWikiVersionParams,
  UpdateWikiVersionParams,
  updateWikiVersionParams,
  WikiVersionId,
  wikiVersionIdSchema,
} from "../db/schema/wikiVersions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWikiVersions = () => revalidatePath("/wiki-versions");

export const createWikiVersionAction = async (input: NewWikiVersionParams) => {
  try {
    const payload = insertWikiVersionParams.parse(input);
    await createWikiVersion(payload);
    revalidateWikiVersions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWikiVersionAction = async (
  input: UpdateWikiVersionParams,
) => {
  try {
    const payload = updateWikiVersionParams.parse(input);
    await updateWikiVersion(payload.id, payload);
    revalidateWikiVersions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWikiVersionAction = async (input: WikiVersionId) => {
  try {
    const payload = wikiVersionIdSchema.parse({ id: input });
    await deleteWikiVersion(payload.id);
    revalidateWikiVersions();
  } catch (e) {
    return handleErrors(e);
  }
};
