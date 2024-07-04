"use server";

import { revalidatePath } from "next/cache";

import {
  createExternalServicesUser,
  deleteExternalServicesUser,
  updateExternalServicesUser,
} from "../api/externalServicesUsers/mutations";
import {
  ExternalServicesUserId,
  externalServicesUserIdSchema,
  insertExternalServicesUserParams,
  NewExternalServicesUserParams,
  UpdateExternalServicesUserParams,
  updateExternalServicesUserParams,
} from "../db/schema/externalServicesUsers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateExternalServicesUsers = () =>
  revalidatePath("/external-services-users");

export const createExternalServicesUserAction = async (
  input: NewExternalServicesUserParams,
) => {
  try {
    const payload = insertExternalServicesUserParams.parse(input);
    await createExternalServicesUser(payload);
    revalidateExternalServicesUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateExternalServicesUserAction = async (
  input: UpdateExternalServicesUserParams,
) => {
  try {
    const payload = updateExternalServicesUserParams.parse(input);
    await updateExternalServicesUser(payload.id, payload);
    revalidateExternalServicesUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteExternalServicesUserAction = async (
  input: ExternalServicesUserId,
) => {
  try {
    const payload = externalServicesUserIdSchema.parse({ id: input });
    await deleteExternalServicesUser(payload.id);
    revalidateExternalServicesUsers();
  } catch (e) {
    return handleErrors(e);
  }
};
