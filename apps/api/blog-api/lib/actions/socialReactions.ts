"use server";

import { revalidatePath } from "next/cache";

import {
  createSocialReaction,
  deleteSocialReaction,
  updateSocialReaction,
} from "../api/socialReactions/mutations";
import {
  insertSocialReactionParams,
  NewSocialReactionParams,
  SocialReactionId,
  socialReactionIdSchema,
  UpdateSocialReactionParams,
  updateSocialReactionParams,
} from "../db/schema/socialReactions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSocialReactions = () => revalidatePath("/social-reactions");

export const createSocialReactionAction = async (
  input: NewSocialReactionParams,
) => {
  try {
    const payload = insertSocialReactionParams.parse(input);
    await createSocialReaction(payload);
    revalidateSocialReactions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSocialReactionAction = async (
  input: UpdateSocialReactionParams,
) => {
  try {
    const payload = updateSocialReactionParams.parse(input);
    await updateSocialReaction(payload.id, payload);
    revalidateSocialReactions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSocialReactionAction = async (input: SocialReactionId) => {
  try {
    const payload = socialReactionIdSchema.parse({ id: input });
    await deleteSocialReaction(payload.id);
    revalidateSocialReactions();
  } catch (e) {
    return handleErrors(e);
  }
};
