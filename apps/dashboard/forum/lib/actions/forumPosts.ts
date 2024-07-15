"use server";

import { revalidatePath } from "next/cache";
import {
  createForumPost,
  deleteForumPost,
  updateForumPost,
} from "@/lib/api/forumPosts/mutations";
import {
  ForumPostId,
  NewForumPostParams,
  UpdateForumPostParams,
  forumPostIdSchema,
  insertForumPostParams,
  updateForumPostParams,
} from "@/lib/db/schema/forumPosts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumPosts = () => revalidatePath("/forum-posts");

export const createForumPostAction = async (input: NewForumPostParams) => {
  try {
    const payload = insertForumPostParams.parse(input);
    await createForumPost(payload);
    revalidateForumPosts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumPostAction = async (input: UpdateForumPostParams) => {
  try {
    const payload = updateForumPostParams.parse(input);
    await updateForumPost(payload.id, payload);
    revalidateForumPosts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumPostAction = async (input: ForumPostId) => {
  try {
    const payload = forumPostIdSchema.parse({ id: input });
    await deleteForumPost(payload.id);
    revalidateForumPosts();
  } catch (e) {
    return handleErrors(e);
  }
};
