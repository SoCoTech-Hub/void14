"use server";

import { revalidatePath } from "next/cache";
import {
  createAuthOauth2LinkedLogin,
  deleteAuthOauth2LinkedLogin,
  updateAuthOauth2LinkedLogin,
} from "@/lib/api/authOauth2LinkedLogins/mutations";
import {
  AuthOauth2LinkedLoginId,
  NewAuthOauth2LinkedLoginParams,
  UpdateAuthOauth2LinkedLoginParams,
  authOauth2LinkedLoginIdSchema,
  insertAuthOauth2LinkedLoginParams,
  updateAuthOauth2LinkedLoginParams,
} from "@/lib/db/schema/authOauth2LinkedLogins";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAuthOauth2LinkedLogins = () => revalidatePath("/auth-oauth2-linked-logins");

export const createAuthOauth2LinkedLoginAction = async (input: NewAuthOauth2LinkedLoginParams) => {
  try {
    const payload = insertAuthOauth2LinkedLoginParams.parse(input);
    await createAuthOauth2LinkedLogin(payload);
    revalidateAuthOauth2LinkedLogins();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAuthOauth2LinkedLoginAction = async (input: UpdateAuthOauth2LinkedLoginParams) => {
  try {
    const payload = updateAuthOauth2LinkedLoginParams.parse(input);
    await updateAuthOauth2LinkedLogin(payload.id, payload);
    revalidateAuthOauth2LinkedLogins();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAuthOauth2LinkedLoginAction = async (input: AuthOauth2LinkedLoginId) => {
  try {
    const payload = authOauth2LinkedLoginIdSchema.parse({ id: input });
    await deleteAuthOauth2LinkedLogin(payload.id);
    revalidateAuthOauth2LinkedLogins();
  } catch (e) {
    return handleErrors(e);
  }
};