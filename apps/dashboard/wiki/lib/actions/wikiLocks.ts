"use server";

import { revalidatePath } from "next/cache";
import {
  createWikiLock,
  deleteWikiLock,
  updateWikiLock,
} from "@/lib/api/wikiLocks/mutations";
import {
  WikiLockId,
  NewWikiLockParams,
  UpdateWikiLockParams,
  wikiLockIdSchema,
  insertWikiLockParams,
  updateWikiLockParams,
} from "@/lib/db/schema/wikiLocks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWikiLocks = () => revalidatePath("/wiki-locks");

export const createWikiLockAction = async (input: NewWikiLockParams) => {
  try {
    const payload = insertWikiLockParams.parse(input);
    await createWikiLock(payload);
    revalidateWikiLocks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWikiLockAction = async (input: UpdateWikiLockParams) => {
  try {
    const payload = updateWikiLockParams.parse(input);
    await updateWikiLock(payload.id, payload);
    revalidateWikiLocks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWikiLockAction = async (input: WikiLockId) => {
  try {
    const payload = wikiLockIdSchema.parse({ id: input });
    await deleteWikiLock(payload.id);
    revalidateWikiLocks();
  } catch (e) {
    return handleErrors(e);
  }
};
