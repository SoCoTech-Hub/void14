"use server";

import { revalidatePath } from "next/cache";
import {
  createAffiliatesDetail,
  deleteAffiliatesDetail,
  updateAffiliatesDetail,
} from "@/lib/api/affiliatesDetails/mutations";
import {
  AffiliatesDetailId,
  NewAffiliatesDetailParams,
  UpdateAffiliatesDetailParams,
  affiliatesDetailIdSchema,
  insertAffiliatesDetailParams,
  updateAffiliatesDetailParams,
} from "@/lib/db/schema/affiliatesDetails";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAffiliatesDetails = () => revalidatePath("/affiliates-details");

export const createAffiliatesDetailAction = async (input: NewAffiliatesDetailParams) => {
  try {
    const payload = insertAffiliatesDetailParams.parse(input);
    await createAffiliatesDetail(payload);
    revalidateAffiliatesDetails();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAffiliatesDetailAction = async (input: UpdateAffiliatesDetailParams) => {
  try {
    const payload = updateAffiliatesDetailParams.parse(input);
    await updateAffiliatesDetail(payload.id, payload);
    revalidateAffiliatesDetails();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAffiliatesDetailAction = async (input: AffiliatesDetailId) => {
  try {
    const payload = affiliatesDetailIdSchema.parse({ id: input });
    await deleteAffiliatesDetail(payload.id);
    revalidateAffiliatesDetails();
  } catch (e) {
    return handleErrors(e);
  }
};
