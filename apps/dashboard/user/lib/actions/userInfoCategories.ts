"use server";

import { revalidatePath } from "next/cache";
import {
  createUserInfoCategory,
  deleteUserInfoCategory,
  updateUserInfoCategory,
} from "@/lib/api/userInfoCategories/mutations";
import {
  UserInfoCategoryId,
  NewUserInfoCategoryParams,
  UpdateUserInfoCategoryParams,
  userInfoCategoryIdSchema,
  insertUserInfoCategoryParams,
  updateUserInfoCategoryParams,
} from "@/lib/db/schema/userInfoCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserInfoCategories = () => revalidatePath("/user-info-categories");

export const createUserInfoCategoryAction = async (input: NewUserInfoCategoryParams) => {
  try {
    const payload = insertUserInfoCategoryParams.parse(input);
    await createUserInfoCategory(payload);
    revalidateUserInfoCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserInfoCategoryAction = async (input: UpdateUserInfoCategoryParams) => {
  try {
    const payload = updateUserInfoCategoryParams.parse(input);
    await updateUserInfoCategory(payload.id, payload);
    revalidateUserInfoCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserInfoCategoryAction = async (input: UserInfoCategoryId) => {
  try {
    const payload = userInfoCategoryIdSchema.parse({ id: input });
    await deleteUserInfoCategory(payload.id);
    revalidateUserInfoCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
