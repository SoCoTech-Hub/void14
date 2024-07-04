"use server";

import { revalidatePath } from "next/cache";

import {
  createSocialIcon,
  deleteSocialIcon,
  updateSocialIcon,
} from "../api/socialIcons/mutations";
import {
  insertSocialIconParams,
  NewSocialIconParams,
  SocialIconId,
  socialIconIdSchema,
  UpdateSocialIconParams,
  updateSocialIconParams,
} from "../db/schema/socialIcons";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSocialIcons = () => revalidatePath("/social-icons");

export const createSocialIconAction = async (input: NewSocialIconParams) => {
  try {
    const payload = insertSocialIconParams.parse(input);
    await createSocialIcon(payload);
    revalidateSocialIcons();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSocialIconAction = async (input: UpdateSocialIconParams) => {
  try {
    const payload = updateSocialIconParams.parse(input);
    await updateSocialIcon(payload.id, payload);
    revalidateSocialIcons();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSocialIconAction = async (input: SocialIconId) => {
  try {
    const payload = socialIconIdSchema.parse({ id: input });
    await deleteSocialIcon(payload.id);
    revalidateSocialIcons();
  } catch (e) {
    return handleErrors(e);
  }
};
