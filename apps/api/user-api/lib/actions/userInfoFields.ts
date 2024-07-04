"use server";

import { revalidatePath } from "next/cache";

import {
  createUserInfoField,
  deleteUserInfoField,
  updateUserInfoField,
} from "../api/userInfoFields/mutations";
import {
  insertUserInfoFieldParams,
  NewUserInfoFieldParams,
  UpdateUserInfoFieldParams,
  updateUserInfoFieldParams,
  UserInfoFieldId,
  userInfoFieldIdSchema,
} from "../db/schema/userInfoFields";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserInfoFields = () => revalidatePath("/user-info-fields");

export const createUserInfoFieldAction = async (
  input: NewUserInfoFieldParams,
) => {
  try {
    const payload = insertUserInfoFieldParams.parse(input);
    await createUserInfoField(payload);
    revalidateUserInfoFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserInfoFieldAction = async (
  input: UpdateUserInfoFieldParams,
) => {
  try {
    const payload = updateUserInfoFieldParams.parse(input);
    await updateUserInfoField(payload.id, payload);
    revalidateUserInfoFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserInfoFieldAction = async (input: UserInfoFieldId) => {
  try {
    const payload = userInfoFieldIdSchema.parse({ id: input });
    await deleteUserInfoField(payload.id);
    revalidateUserInfoFields();
  } catch (e) {
    return handleErrors(e);
  }
};
