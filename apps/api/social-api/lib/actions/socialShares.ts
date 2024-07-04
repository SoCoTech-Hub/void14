"use server";

import { revalidatePath } from "next/cache";

import {
  createSocialShare,
  deleteSocialShare,
  updateSocialShare,
} from "../api/socialShares/mutations";
import {
  insertSocialShareParams,
  NewSocialShareParams,
  SocialShareId,
  socialShareIdSchema,
  UpdateSocialShareParams,
  updateSocialShareParams,
} from "../db/schema/socialShares";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSocialShares = () => revalidatePath("/social-shares");

export const createSocialShareAction = async (input: NewSocialShareParams) => {
  try {
    const payload = insertSocialShareParams.parse(input);
    await createSocialShare(payload);
    revalidateSocialShares();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSocialShareAction = async (
  input: UpdateSocialShareParams,
) => {
  try {
    const payload = updateSocialShareParams.parse(input);
    await updateSocialShare(payload.id, payload);
    revalidateSocialShares();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSocialShareAction = async (input: SocialShareId) => {
  try {
    const payload = socialShareIdSchema.parse({ id: input });
    await deleteSocialShare(payload.id);
    revalidateSocialShares();
  } catch (e) {
    return handleErrors(e);
  }
};
