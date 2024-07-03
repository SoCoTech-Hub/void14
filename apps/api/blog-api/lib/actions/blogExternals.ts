"use server";

import { revalidatePath } from "next/cache";
import {
  createBlogExternal,
  deleteBlogExternal,
  updateBlogExternal,
} from "@/lib/api/blogExternals/mutations";
import {
  BlogExternalId,
  NewBlogExternalParams,
  UpdateBlogExternalParams,
  blogExternalIdSchema,
  insertBlogExternalParams,
  updateBlogExternalParams,
} from "@/lib/db/schema/blogExternals";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlogExternals = () => revalidatePath("/blog-externals");

export const createBlogExternalAction = async (input: NewBlogExternalParams) => {
  try {
    const payload = insertBlogExternalParams.parse(input);
    await createBlogExternal(payload);
    revalidateBlogExternals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlogExternalAction = async (input: UpdateBlogExternalParams) => {
  try {
    const payload = updateBlogExternalParams.parse(input);
    await updateBlogExternal(payload.id, payload);
    revalidateBlogExternals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlogExternalAction = async (input: BlogExternalId) => {
  try {
    const payload = blogExternalIdSchema.parse({ id: input });
    await deleteBlogExternal(payload.id);
    revalidateBlogExternals();
  } catch (e) {
    return handleErrors(e);
  }
};