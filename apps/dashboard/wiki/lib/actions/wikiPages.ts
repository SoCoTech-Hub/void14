"use server";

import { revalidatePath } from "next/cache";
import {
  createWikiPage,
  deleteWikiPage,
  updateWikiPage,
} from "@/lib/api/wikiPages/mutations";
import {
  WikiPageId,
  NewWikiPageParams,
  UpdateWikiPageParams,
  wikiPageIdSchema,
  insertWikiPageParams,
  updateWikiPageParams,
} from "@/lib/db/schema/wikiPages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWikiPages = () => revalidatePath("/wiki-pages");

export const createWikiPageAction = async (input: NewWikiPageParams) => {
  try {
    const payload = insertWikiPageParams.parse(input);
    await createWikiPage(payload);
    revalidateWikiPages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWikiPageAction = async (input: UpdateWikiPageParams) => {
  try {
    const payload = updateWikiPageParams.parse(input);
    await updateWikiPage(payload.id, payload);
    revalidateWikiPages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWikiPageAction = async (input: WikiPageId) => {
  try {
    const payload = wikiPageIdSchema.parse({ id: input });
    await deleteWikiPage(payload.id);
    revalidateWikiPages();
  } catch (e) {
    return handleErrors(e);
  }
};
