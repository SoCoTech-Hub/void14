"use server";

import { revalidatePath } from "next/cache";
import {
  createWikiSubwiki,
  deleteWikiSubwiki,
  updateWikiSubwiki,
} from "@/lib/api/wikiSubwikis/mutations";
import {
  WikiSubwikiId,
  NewWikiSubwikiParams,
  UpdateWikiSubwikiParams,
  wikiSubwikiIdSchema,
  insertWikiSubwikiParams,
  updateWikiSubwikiParams,
} from "@/lib/db/schema/wikiSubwikis";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWikiSubwikis = () => revalidatePath("/wiki-subwikis");

export const createWikiSubwikiAction = async (input: NewWikiSubwikiParams) => {
  try {
    const payload = insertWikiSubwikiParams.parse(input);
    await createWikiSubwiki(payload);
    revalidateWikiSubwikis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWikiSubwikiAction = async (input: UpdateWikiSubwikiParams) => {
  try {
    const payload = updateWikiSubwikiParams.parse(input);
    await updateWikiSubwiki(payload.id, payload);
    revalidateWikiSubwikis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWikiSubwikiAction = async (input: WikiSubwikiId) => {
  try {
    const payload = wikiSubwikiIdSchema.parse({ id: input });
    await deleteWikiSubwiki(payload.id);
    revalidateWikiSubwikis();
  } catch (e) {
    return handleErrors(e);
  }
};
