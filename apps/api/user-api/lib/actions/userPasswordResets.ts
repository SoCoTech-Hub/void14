"use server";

import { revalidatePath } from "next/cache";

import {
  createUserPasswordReset,
  deleteUserPasswordReset,
  updateUserPasswordReset,
} from "../api/userPasswordResets/mutations";
import {
  insertUserPasswordResetParams,
  NewUserPasswordResetParams,
  UpdateUserPasswordResetParams,
  updateUserPasswordResetParams,
  UserPasswordResetId,
  userPasswordResetIdSchema,
} from "../db/schema/userPasswordResets";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserPasswordResets = () =>
  revalidatePath("/user-password-resets");

export const createUserPasswordResetAction = async (
  input: NewUserPasswordResetParams,
) => {
  try {
    const payload = insertUserPasswordResetParams.parse(input);
    await createUserPasswordReset(payload);
    revalidateUserPasswordResets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserPasswordResetAction = async (
  input: UpdateUserPasswordResetParams,
) => {
  try {
    const payload = updateUserPasswordResetParams.parse(input);
    await updateUserPasswordReset(payload.id, payload);
    revalidateUserPasswordResets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserPasswordResetAction = async (
  input: UserPasswordResetId,
) => {
  try {
    const payload = userPasswordResetIdSchema.parse({ id: input });
    await deleteUserPasswordReset(payload.id);
    revalidateUserPasswordResets();
  } catch (e) {
    return handleErrors(e);
  }
};
