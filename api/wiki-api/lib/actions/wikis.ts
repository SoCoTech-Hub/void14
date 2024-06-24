"use server";

import { revalidatePath } from "next/cache";
import {
  createWiki,
  deleteWiki,
  updateWiki,
} from "@/lib/api/wikis/mutations";
import {
  WikiId,
  NewWikiParams,
  UpdateWikiParams,
  wikiIdSchema,
  insertWikiParams,
  updateWikiParams,
} from "@/lib/db/schema/wikis";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWikis = () => revalidatePath("/wikis");

export const createWikiAction = async (input: NewWikiParams) => {
  try {
    const payload = insertWikiParams.parse(input);
    await createWiki(payload);
    revalidateWikis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWikiAction = async (input: UpdateWikiParams) => {
  try {
    const payload = updateWikiParams.parse(input);
    await updateWiki(payload.id, payload);
    revalidateWikis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWikiAction = async (input: WikiId) => {
  try {
    const payload = wikiIdSchema.parse({ id: input });
    await deleteWiki(payload.id);
    revalidateWikis();
  } catch (e) {
    return handleErrors(e);
  }
};