"use server";

import { revalidatePath } from "next/cache";
import {
  createBlogAssociation,
  deleteBlogAssociation,
  updateBlogAssociation,
} from "@/lib/api/blogAssociations/mutations";
import {
  BlogAssociationId,
  NewBlogAssociationParams,
  UpdateBlogAssociationParams,
  blogAssociationIdSchema,
  insertBlogAssociationParams,
  updateBlogAssociationParams,
} from "@/lib/db/schema/blogAssociations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlogAssociations = () => revalidatePath("/blog-associations");

export const createBlogAssociationAction = async (input: NewBlogAssociationParams) => {
  try {
    const payload = insertBlogAssociationParams.parse(input);
    await createBlogAssociation(payload);
    revalidateBlogAssociations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlogAssociationAction = async (input: UpdateBlogAssociationParams) => {
  try {
    const payload = updateBlogAssociationParams.parse(input);
    await updateBlogAssociation(payload.id, payload);
    revalidateBlogAssociations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlogAssociationAction = async (input: BlogAssociationId) => {
  try {
    const payload = blogAssociationIdSchema.parse({ id: input });
    await deleteBlogAssociation(payload.id);
    revalidateBlogAssociations();
  } catch (e) {
    return handleErrors(e);
  }
};
