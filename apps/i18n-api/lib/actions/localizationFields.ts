"use server";

import { revalidatePath } from "next/cache";
import {
  createLocalizationField,
  deleteLocalizationField,
  updateLocalizationField,
} from "@/lib/api/localizationFields/mutations";
import {
  LocalizationFieldId,
  NewLocalizationFieldParams,
  UpdateLocalizationFieldParams,
  localizationFieldIdSchema,
  insertLocalizationFieldParams,
  updateLocalizationFieldParams,
} from "@/lib/db/schema/localizationFields";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLocalizationFields = () => revalidatePath("/localization-fields");

export const createLocalizationFieldAction = async (input: NewLocalizationFieldParams) => {
  try {
    const payload = insertLocalizationFieldParams.parse(input);
    await createLocalizationField(payload);
    revalidateLocalizationFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLocalizationFieldAction = async (input: UpdateLocalizationFieldParams) => {
  try {
    const payload = updateLocalizationFieldParams.parse(input);
    await updateLocalizationField(payload.id, payload);
    revalidateLocalizationFields();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLocalizationFieldAction = async (input: LocalizationFieldId) => {
  try {
    const payload = localizationFieldIdSchema.parse({ id: input });
    await deleteLocalizationField(payload.id);
    revalidateLocalizationFields();
  } catch (e) {
    return handleErrors(e);
  }
};