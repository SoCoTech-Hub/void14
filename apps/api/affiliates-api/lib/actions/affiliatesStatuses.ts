"use server";

import { revalidatePath } from "next/cache";

import {
  createAffiliatesStatus,
  deleteAffiliatesStatus,
  updateAffiliatesStatus,
} from "../api/affiliatesStatuses/mutations";
import {
  AffiliatesStatusId,
  affiliatesStatusIdSchema,
  insertAffiliatesStatusParams,
  NewAffiliatesStatusParams,
  UpdateAffiliatesStatusParams,
  updateAffiliatesStatusParams,
} from "../db/schema/affiliatesStatuses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAffiliatesStatuses = () =>
  revalidatePath("/affiliates-statuses");

export const createAffiliatesStatusAction = async (
  input: NewAffiliatesStatusParams,
) => {
  try {
    const payload = insertAffiliatesStatusParams.parse(input);
    await createAffiliatesStatus(payload);
    revalidateAffiliatesStatuses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAffiliatesStatusAction = async (
  input: UpdateAffiliatesStatusParams,
) => {
  try {
    const payload = updateAffiliatesStatusParams.parse(input);
    await updateAffiliatesStatus(payload.id, payload);
    revalidateAffiliatesStatuses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAffiliatesStatusAction = async (
  input: AffiliatesStatusId,
) => {
  try {
    const payload = affiliatesStatusIdSchema.parse({ id: input });
    await deleteAffiliatesStatus(payload.id);
    revalidateAffiliatesStatuses();
  } catch (e) {
    return handleErrors(e);
  }
};
