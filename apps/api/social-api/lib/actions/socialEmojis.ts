"use server";

import { revalidatePath } from "next/cache";

import {
  createSocialEmoji,
  deleteSocialEmoji,
  updateSocialEmoji,
} from "../api/socialEmojis/mutations";
import {
  insertSocialEmojiParams,
  NewSocialEmojiParams,
  SocialEmojiId,
  socialEmojiIdSchema,
  UpdateSocialEmojiParams,
  updateSocialEmojiParams,
} from "../db/schema/socialEmojis";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSocialEmojis = () => revalidatePath("/social-emojis");

export const createSocialEmojiAction = async (input: NewSocialEmojiParams) => {
  try {
    const payload = insertSocialEmojiParams.parse(input);
    await createSocialEmoji(payload);
    revalidateSocialEmojis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSocialEmojiAction = async (
  input: UpdateSocialEmojiParams,
) => {
  try {
    const payload = updateSocialEmojiParams.parse(input);
    await updateSocialEmoji(payload.id, payload);
    revalidateSocialEmojis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSocialEmojiAction = async (input: SocialEmojiId) => {
  try {
    const payload = socialEmojiIdSchema.parse({ id: input });
    await deleteSocialEmoji(payload.id);
    revalidateSocialEmojis();
  } catch (e) {
    return handleErrors(e);
  }
};
