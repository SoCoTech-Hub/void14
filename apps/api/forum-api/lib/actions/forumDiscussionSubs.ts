"use server";

import { revalidatePath } from "next/cache";
import {
  createForumDiscussionSub,
  deleteForumDiscussionSub,
  updateForumDiscussionSub,
} from "@/lib/api/forumDiscussionSubs/mutations";
import {
  ForumDiscussionSubId,
  NewForumDiscussionSubParams,
  UpdateForumDiscussionSubParams,
  forumDiscussionSubIdSchema,
  insertForumDiscussionSubParams,
  updateForumDiscussionSubParams,
} from "@/lib/db/schema/forumDiscussionSubs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumDiscussionSubs = () => revalidatePath("/forum-discussion-subs");

export const createForumDiscussionSubAction = async (input: NewForumDiscussionSubParams) => {
  try {
    const payload = insertForumDiscussionSubParams.parse(input);
    await createForumDiscussionSub(payload);
    revalidateForumDiscussionSubs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumDiscussionSubAction = async (input: UpdateForumDiscussionSubParams) => {
  try {
    const payload = updateForumDiscussionSubParams.parse(input);
    await updateForumDiscussionSub(payload.id, payload);
    revalidateForumDiscussionSubs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumDiscussionSubAction = async (input: ForumDiscussionSubId) => {
  try {
    const payload = forumDiscussionSubIdSchema.parse({ id: input });
    await deleteForumDiscussionSub(payload.id);
    revalidateForumDiscussionSubs();
  } catch (e) {
    return handleErrors(e);
  }
};