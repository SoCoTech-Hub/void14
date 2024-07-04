"use server";

import { revalidatePath } from "next/cache";

import { createBlog, deleteBlog, updateBlog } from "../api/blogs/mutations";
import {
  BlogId,
  blogIdSchema,
  insertBlogParams,
  NewBlogParams,
  UpdateBlogParams,
  updateBlogParams,
} from "../db/schema/blogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlogs = () => revalidatePath("/blogs");

export const createBlogAction = async (input: NewBlogParams) => {
  try {
    const payload = insertBlogParams.parse(input);
    await createBlog(payload);
    revalidateBlogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlogAction = async (input: UpdateBlogParams) => {
  try {
    const payload = updateBlogParams.parse(input);
    await updateBlog(payload.id, payload);
    revalidateBlogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlogAction = async (input: BlogId) => {
  try {
    const payload = blogIdSchema.parse({ id: input });
    await deleteBlog(payload.id);
    revalidateBlogs();
  } catch (e) {
    return handleErrors(e);
  }
};
