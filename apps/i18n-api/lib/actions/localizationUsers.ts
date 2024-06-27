"use server";

import { revalidatePath } from "next/cache";
import {
  createLocalizationUser,
  deleteLocalizationUser,
  updateLocalizationUser,
} from "@/lib/api/localizationUsers/mutations";
import {
  LocalizationUserId,
  NewLocalizationUserParams,
  UpdateLocalizationUserParams,
  localizationUserIdSchema,
  insertLocalizationUserParams,
  updateLocalizationUserParams,
} from "@/lib/db/schema/localizationUsers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLocalizationUsers = () => revalidatePath("/localization-users");

export const createLocalizationUserAction = async (input: NewLocalizationUserParams) => {
  try {
    const payload = insertLocalizationUserParams.parse(input);
    await createLocalizationUser(payload);
    revalidateLocalizationUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLocalizationUserAction = async (input: UpdateLocalizationUserParams) => {
  try {
    const payload = updateLocalizationUserParams.parse(input);
    await updateLocalizationUser(payload.id, payload);
    revalidateLocalizationUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLocalizationUserAction = async (input: LocalizationUserId) => {
  try {
    const payload = localizationUserIdSchema.parse({ id: input });
    await deleteLocalizationUser(payload.id);
    revalidateLocalizationUsers();
  } catch (e) {
    return handleErrors(e);
  }
};