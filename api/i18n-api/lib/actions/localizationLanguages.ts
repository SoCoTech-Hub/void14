"use server";

import { revalidatePath } from "next/cache";
import {
  createLocalizationLanguage,
  deleteLocalizationLanguage,
  updateLocalizationLanguage,
} from "@/lib/api/localizationLanguages/mutations";
import {
  LocalizationLanguageId,
  NewLocalizationLanguageParams,
  UpdateLocalizationLanguageParams,
  localizationLanguageIdSchema,
  insertLocalizationLanguageParams,
  updateLocalizationLanguageParams,
} from "@/lib/db/schema/localizationLanguages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLocalizationLanguages = () => revalidatePath("/localization-languages");

export const createLocalizationLanguageAction = async (input: NewLocalizationLanguageParams) => {
  try {
    const payload = insertLocalizationLanguageParams.parse(input);
    await createLocalizationLanguage(payload);
    revalidateLocalizationLanguages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLocalizationLanguageAction = async (input: UpdateLocalizationLanguageParams) => {
  try {
    const payload = updateLocalizationLanguageParams.parse(input);
    await updateLocalizationLanguage(payload.id, payload);
    revalidateLocalizationLanguages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLocalizationLanguageAction = async (input: LocalizationLanguageId) => {
  try {
    const payload = localizationLanguageIdSchema.parse({ id: input });
    await deleteLocalizationLanguage(payload.id);
    revalidateLocalizationLanguages();
  } catch (e) {
    return handleErrors(e);
  }
};