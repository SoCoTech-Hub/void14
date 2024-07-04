"use server";

import { revalidatePath } from "next/cache";

import {
  createSocialLink,
  deleteSocialLink,
  updateSocialLink,
} from "../api/socialLinks/mutations";
import {
  insertSocialLinkParams,
  NewSocialLinkParams,
  SocialLinkId,
  socialLinkIdSchema,
  UpdateSocialLinkParams,
  updateSocialLinkParams,
} from "../db/schema/socialLinks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSocialLinks = () => revalidatePath("/social-links");

export const createSocialLinkAction = async (input: NewSocialLinkParams) => {
  try {
    const payload = insertSocialLinkParams.parse(input);
    await createSocialLink(payload);
    revalidateSocialLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSocialLinkAction = async (input: UpdateSocialLinkParams) => {
  try {
    const payload = updateSocialLinkParams.parse(input);
    await updateSocialLink(payload.id, payload);
    revalidateSocialLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSocialLinkAction = async (input: SocialLinkId) => {
  try {
    const payload = socialLinkIdSchema.parse({ id: input });
    await deleteSocialLink(payload.id);
    revalidateSocialLinks();
  } catch (e) {
    return handleErrors(e);
  }
};
