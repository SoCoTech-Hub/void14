"use server";

import { revalidatePath } from "next/cache";
import {
  createUserPrivateKey,
  deleteUserPrivateKey,
  updateUserPrivateKey,
} from "@/lib/api/userPrivateKeys/mutations";
import {
  UserPrivateKeyId,
  NewUserPrivateKeyParams,
  UpdateUserPrivateKeyParams,
  userPrivateKeyIdSchema,
  insertUserPrivateKeyParams,
  updateUserPrivateKeyParams,
} from "@/lib/db/schema/userPrivateKeys";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserPrivateKeys = () => revalidatePath("/user-private-keys");

export const createUserPrivateKeyAction = async (input: NewUserPrivateKeyParams) => {
  try {
    const payload = insertUserPrivateKeyParams.parse(input);
    await createUserPrivateKey(payload);
    revalidateUserPrivateKeys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserPrivateKeyAction = async (input: UpdateUserPrivateKeyParams) => {
  try {
    const payload = updateUserPrivateKeyParams.parse(input);
    await updateUserPrivateKey(payload.id, payload);
    revalidateUserPrivateKeys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserPrivateKeyAction = async (input: UserPrivateKeyId) => {
  try {
    const payload = userPrivateKeyIdSchema.parse({ id: input });
    await deleteUserPrivateKey(payload.id);
    revalidateUserPrivateKeys();
  } catch (e) {
    return handleErrors(e);
  }
};