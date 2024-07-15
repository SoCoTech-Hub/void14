"use server";

import { revalidatePath } from "next/cache";
import {
  createAffiliatesSetting,
  deleteAffiliatesSetting,
  updateAffiliatesSetting,
} from "@/lib/api/affiliatesSettings/mutations";
import {
  AffiliatesSettingId,
  NewAffiliatesSettingParams,
  UpdateAffiliatesSettingParams,
  affiliatesSettingIdSchema,
  insertAffiliatesSettingParams,
  updateAffiliatesSettingParams,
} from "@/lib/db/schema/affiliatesSettings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAffiliatesSettings = () => revalidatePath("/affiliates-settings");

export const createAffiliatesSettingAction = async (input: NewAffiliatesSettingParams) => {
  try {
    const payload = insertAffiliatesSettingParams.parse(input);
    await createAffiliatesSetting(payload);
    revalidateAffiliatesSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAffiliatesSettingAction = async (input: UpdateAffiliatesSettingParams) => {
  try {
    const payload = updateAffiliatesSettingParams.parse(input);
    await updateAffiliatesSetting(payload.id, payload);
    revalidateAffiliatesSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAffiliatesSettingAction = async (input: AffiliatesSettingId) => {
  try {
    const payload = affiliatesSettingIdSchema.parse({ id: input });
    await deleteAffiliatesSetting(payload.id);
    revalidateAffiliatesSettings();
  } catch (e) {
    return handleErrors(e);
  }
};
