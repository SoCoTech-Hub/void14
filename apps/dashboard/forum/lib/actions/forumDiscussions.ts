"use server";

import { revalidatePath } from "next/cache";
import {
  createForumDiscussion,
  deleteForumDiscussion,
  updateForumDiscussion,
} from "@/lib/api/forumDiscussions/mutations";
import {
  ForumDiscussionId,
  NewForumDiscussionParams,
  UpdateForumDiscussionParams,
  forumDiscussionIdSchema,
  insertForumDiscussionParams,
  updateForumDiscussionParams,
} from "@/lib/db/schema/forumDiscussions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumDiscussions = () => revalidatePath("/forum-discussions");

export const createForumDiscussionAction = async (input: NewForumDiscussionParams) => {
  try {
    const payload = insertForumDiscussionParams.parse(input);
    await createForumDiscussion(payload);
    revalidateForumDiscussions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumDiscussionAction = async (input: UpdateForumDiscussionParams) => {
  try {
    const payload = updateForumDiscussionParams.parse(input);
    await updateForumDiscussion(payload.id, payload);
    revalidateForumDiscussions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumDiscussionAction = async (input: ForumDiscussionId) => {
  try {
    const payload = forumDiscussionIdSchema.parse({ id: input });
    await deleteForumDiscussion(payload.id);
    revalidateForumDiscussions();
  } catch (e) {
    return handleErrors(e);
  }
};
