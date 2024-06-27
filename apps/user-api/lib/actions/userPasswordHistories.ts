"use server";

import { revalidatePath } from "next/cache";
import {
  createUserPasswordHistory,
  deleteUserPasswordHistory,
  updateUserPasswordHistory,
} from "@/lib/api/userPasswordHistories/mutations";
import {
  UserPasswordHistoryId,
  NewUserPasswordHistoryParams,
  UpdateUserPasswordHistoryParams,
  userPasswordHistoryIdSchema,
  insertUserPasswordHistoryParams,
  updateUserPasswordHistoryParams,
} from "@/lib/db/schema/userPasswordHistories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserPasswordHistories = () => revalidatePath("/user-password-histories");

export const createUserPasswordHistoryAction = async (input: NewUserPasswordHistoryParams) => {
  try {
    const payload = insertUserPasswordHistoryParams.parse(input);
    await createUserPasswordHistory(payload);
    revalidateUserPasswordHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserPasswordHistoryAction = async (input: UpdateUserPasswordHistoryParams) => {
  try {
    const payload = updateUserPasswordHistoryParams.parse(input);
    await updateUserPasswordHistory(payload.id, payload);
    revalidateUserPasswordHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserPasswordHistoryAction = async (input: UserPasswordHistoryId) => {
  try {
    const payload = userPasswordHistoryIdSchema.parse({ id: input });
    await deleteUserPasswordHistory(payload.id);
    revalidateUserPasswordHistories();
  } catch (e) {
    return handleErrors(e);
  }
};