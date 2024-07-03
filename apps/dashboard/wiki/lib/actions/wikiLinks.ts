"use server";

import { revalidatePath } from "next/cache";
import {
  createWikiLink,
  deleteWikiLink,
  updateWikiLink,
} from "@/lib/api/wikiLinks/mutations";
import {
  WikiLinkId,
  NewWikiLinkParams,
  UpdateWikiLinkParams,
  wikiLinkIdSchema,
  insertWikiLinkParams,
  updateWikiLinkParams,
} from "@/lib/db/schema/wikiLinks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWikiLinks = () => revalidatePath("/wiki-links");

export const createWikiLinkAction = async (input: NewWikiLinkParams) => {
  try {
    const payload = insertWikiLinkParams.parse(input);
    await createWikiLink(payload);
    revalidateWikiLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWikiLinkAction = async (input: UpdateWikiLinkParams) => {
  try {
    const payload = updateWikiLinkParams.parse(input);
    await updateWikiLink(payload.id, payload);
    revalidateWikiLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWikiLinkAction = async (input: WikiLinkId) => {
  try {
    const payload = wikiLinkIdSchema.parse({ id: input });
    await deleteWikiLink(payload.id);
    revalidateWikiLinks();
  } catch (e) {
    return handleErrors(e);
  }
};