"use server";

import { revalidatePath } from "next/cache";
import {
  createLocalizationTranslation,
  deleteLocalizationTranslation,
  updateLocalizationTranslation,
} from "@/lib/api/localizationTranslations/mutations";
import {
  LocalizationTranslationId,
  NewLocalizationTranslationParams,
  UpdateLocalizationTranslationParams,
  localizationTranslationIdSchema,
  insertLocalizationTranslationParams,
  updateLocalizationTranslationParams,
} from "@/lib/db/schema/localizationTranslations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLocalizationTranslations = () => revalidatePath("/localization-translations");

export const createLocalizationTranslationAction = async (input: NewLocalizationTranslationParams) => {
  try {
    const payload = insertLocalizationTranslationParams.parse(input);
    await createLocalizationTranslation(payload);
    revalidateLocalizationTranslations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLocalizationTranslationAction = async (input: UpdateLocalizationTranslationParams) => {
  try {
    const payload = updateLocalizationTranslationParams.parse(input);
    await updateLocalizationTranslation(payload.id, payload);
    revalidateLocalizationTranslations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLocalizationTranslationAction = async (input: LocalizationTranslationId) => {
  try {
    const payload = localizationTranslationIdSchema.parse({ id: input });
    await deleteLocalizationTranslation(payload.id);
    revalidateLocalizationTranslations();
  } catch (e) {
    return handleErrors(e);
  }
};
