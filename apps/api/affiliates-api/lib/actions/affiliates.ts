"use server";

import { revalidatePath } from "next/cache";

import {
  createAffiliate,
  deleteAffiliate,
  updateAffiliate,
} from "../api/affiliates/mutations";
import {
  AffiliateId,
  affiliateIdSchema,
  insertAffiliateParams,
  NewAffiliateParams,
  UpdateAffiliateParams,
  updateAffiliateParams,
} from "../db/schema/affiliates";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAffiliates = () => revalidatePath("/affiliates");

export const createAffiliateAction = async (input: NewAffiliateParams) => {
  try {
    const payload = insertAffiliateParams.parse(input);
    await createAffiliate(payload);
    revalidateAffiliates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAffiliateAction = async (input: UpdateAffiliateParams) => {
  try {
    const payload = updateAffiliateParams.parse(input);
    await updateAffiliate(payload.id, payload);
    revalidateAffiliates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAffiliateAction = async (input: AffiliateId) => {
  try {
    const payload = affiliateIdSchema.parse({ id: input });
    await deleteAffiliate(payload.id);
    revalidateAffiliates();
  } catch (e) {
    return handleErrors(e);
  }
};
