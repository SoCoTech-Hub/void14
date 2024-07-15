"use server";

import { revalidatePath } from "next/cache";
import {
  createSocial,
  deleteSocial,
  updateSocial,
} from "@/lib/api/socials/mutations";
import {
  SocialId,
  NewSocialParams,
  UpdateSocialParams,
  socialIdSchema,
  insertSocialParams,
  updateSocialParams,
} from "@/lib/db/schema/socials";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSocials = () => revalidatePath("/socials");

export const createSocialAction = async (input: NewSocialParams) => {
  try {
    const payload = insertSocialParams.parse(input);
    await createSocial(payload);
    revalidateSocials();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSocialAction = async (input: UpdateSocialParams) => {
  try {
    const payload = updateSocialParams.parse(input);
    await updateSocial(payload.id, payload);
    revalidateSocials();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSocialAction = async (input: SocialId) => {
  try {
    const payload = socialIdSchema.parse({ id: input });
    await deleteSocial(payload.id);
    revalidateSocials();
  } catch (e) {
    return handleErrors(e);
  }
};
