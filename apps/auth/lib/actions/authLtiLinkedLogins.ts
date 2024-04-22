"use server";

import { revalidatePath } from "next/cache";
import {
  createAuthLtiLinkedLogin,
  deleteAuthLtiLinkedLogin,
  updateAuthLtiLinkedLogin,
} from "@/lib/api/authLtiLinkedLogins/mutations";
import {
  AuthLtiLinkedLoginId,
  NewAuthLtiLinkedLoginParams,
  UpdateAuthLtiLinkedLoginParams,
  authLtiLinkedLoginIdSchema,
  insertAuthLtiLinkedLoginParams,
  updateAuthLtiLinkedLoginParams,
} from "@/lib/db/schema/authLtiLinkedLogins";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAuthLtiLinkedLogins = () => revalidatePath("/auth-lti-linked-logins");

export const createAuthLtiLinkedLoginAction = async (input: NewAuthLtiLinkedLoginParams) => {
  try {
    const payload = insertAuthLtiLinkedLoginParams.parse(input);
    await createAuthLtiLinkedLogin(payload);
    revalidateAuthLtiLinkedLogins();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAuthLtiLinkedLoginAction = async (input: UpdateAuthLtiLinkedLoginParams) => {
  try {
    const payload = updateAuthLtiLinkedLoginParams.parse(input);
    await updateAuthLtiLinkedLogin(payload.id, payload);
    revalidateAuthLtiLinkedLogins();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAuthLtiLinkedLoginAction = async (input: AuthLtiLinkedLoginId) => {
  try {
    const payload = authLtiLinkedLoginIdSchema.parse({ id: input });
    await deleteAuthLtiLinkedLogin(payload.id);
    revalidateAuthLtiLinkedLogins();
  } catch (e) {
    return handleErrors(e);
  }
};