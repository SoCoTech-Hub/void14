"use server";

import { revalidatePath } from "next/cache";
import {
  createWikiSynonym,
  deleteWikiSynonym,
  updateWikiSynonym,
} from "@/lib/api/wikiSynonyms/mutations";
import {
  WikiSynonymId,
  NewWikiSynonymParams,
  UpdateWikiSynonymParams,
  wikiSynonymIdSchema,
  insertWikiSynonymParams,
  updateWikiSynonymParams,
} from "@/lib/db/schema/wikiSynonyms";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWikiSynonyms = () => revalidatePath("/wiki-synonyms");

export const createWikiSynonymAction = async (input: NewWikiSynonymParams) => {
  try {
    const payload = insertWikiSynonymParams.parse(input);
    await createWikiSynonym(payload);
    revalidateWikiSynonyms();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWikiSynonymAction = async (input: UpdateWikiSynonymParams) => {
  try {
    const payload = updateWikiSynonymParams.parse(input);
    await updateWikiSynonym(payload.id, payload);
    revalidateWikiSynonyms();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWikiSynonymAction = async (input: WikiSynonymId) => {
  try {
    const payload = wikiSynonymIdSchema.parse({ id: input });
    await deleteWikiSynonym(payload.id);
    revalidateWikiSynonyms();
  } catch (e) {
    return handleErrors(e);
  }
};
