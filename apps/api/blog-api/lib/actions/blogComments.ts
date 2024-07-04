"use server";

import { revalidatePath } from "next/cache";

import {
  createBlogComment,
  deleteBlogComment,
  updateBlogComment,
} from "../api/blogComments/mutations";
import {
  BlogCommentId,
  blogCommentIdSchema,
  insertBlogCommentParams,
  NewBlogCommentParams,
  UpdateBlogCommentParams,
  updateBlogCommentParams,
} from "../db/schema/blogComments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlogComments = () => revalidatePath("/blog-comments");

export const createBlogCommentAction = async (input: NewBlogCommentParams) => {
  try {
    const payload = insertBlogCommentParams.parse(input);
    await createBlogComment(payload);
    revalidateBlogComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlogCommentAction = async (
  input: UpdateBlogCommentParams,
) => {
  try {
    const payload = updateBlogCommentParams.parse(input);
    await updateBlogComment(payload.id, payload);
    revalidateBlogComments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlogCommentAction = async (input: BlogCommentId) => {
  try {
    const payload = blogCommentIdSchema.parse({ id: input });
    await deleteBlogComment(payload.id);
    revalidateBlogComments();
  } catch (e) {
    return handleErrors(e);
  }
};
