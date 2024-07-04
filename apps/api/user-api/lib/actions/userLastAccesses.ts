"use server";

import { revalidatePath } from "next/cache";

import {
  createUserLastAccess,
  deleteUserLastAccess,
  updateUserLastAccess,
} from "../api/userLastAccesses/mutations";
import {
  insertUserLastAccessParams,
  NewUserLastAccessParams,
  UpdateUserLastAccessParams,
  updateUserLastAccessParams,
  UserLastAccessId,
  userLastAccessIdSchema,
} from "../db/schema/userLastAccesses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserLastAccesses = () => revalidatePath("/user-last-accesses");

export const createUserLastAccessAction = async (
  input: NewUserLastAccessParams,
) => {
  try {
    const payload = insertUserLastAccessParams.parse(input);
    await createUserLastAccess(payload);
    revalidateUserLastAccesses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserLastAccessAction = async (
  input: UpdateUserLastAccessParams,
) => {
  try {
    const payload = updateUserLastAccessParams.parse(input);
    await updateUserLastAccess(payload.id, payload);
    revalidateUserLastAccesses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserLastAccessAction = async (input: UserLastAccessId) => {
  try {
    const payload = userLastAccessIdSchema.parse({ id: input });
    await deleteUserLastAccess(payload.id);
    revalidateUserLastAccesses();
  } catch (e) {
    return handleErrors(e);
  }
};
