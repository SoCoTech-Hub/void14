"use server";

import { revalidatePath } from "next/cache";
import {
  createForumDigest,
  deleteForumDigest,
  updateForumDigest,
} from "@/lib/api/forumDigests/mutations";
import {
  ForumDigestId,
  NewForumDigestParams,
  UpdateForumDigestParams,
  forumDigestIdSchema,
  insertForumDigestParams,
  updateForumDigestParams,
} from "@/lib/db/schema/forumDigests";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumDigests = () => revalidatePath("/forum-digests");

export const createForumDigestAction = async (input: NewForumDigestParams) => {
  try {
    const payload = insertForumDigestParams.parse(input);
    await createForumDigest(payload);
    revalidateForumDigests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumDigestAction = async (input: UpdateForumDigestParams) => {
  try {
    const payload = updateForumDigestParams.parse(input);
    await updateForumDigest(payload.id, payload);
    revalidateForumDigests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumDigestAction = async (input: ForumDigestId) => {
  try {
    const payload = forumDigestIdSchema.parse({ id: input });
    await deleteForumDigest(payload.id);
    revalidateForumDigests();
  } catch (e) {
    return handleErrors(e);
  }
};