import type {
  NewSocialEmojiParams,
  SocialEmojiId,
  UpdateSocialEmojiParams,
} from "@soco/social-db/schema/socialEmojis";
import { eq } from "@soco/social-db";
import { db } from "@soco/social-db/client";
import {
  insertSocialEmojiSchema,
  socialEmojiIdSchema,
  socialEmojis,
  updateSocialEmojiSchema,
} from "@soco/social-db/schema/socialEmojis";

export const createSocialEmoji = async (socialEmoji: NewSocialEmojiParams) => {
  const newSocialEmoji = insertSocialEmojiSchema.parse(socialEmoji);
  try {
    const [s] = await db
      .insert(socialEmojis)
      .values(newSocialEmoji)
      .returning();
    return { socialEmoji: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSocialEmoji = async (
  id: SocialEmojiId,
  socialEmoji: UpdateSocialEmojiParams,
) => {
  const { id: socialEmojiId } = socialEmojiIdSchema.parse({ id });
  const newSocialEmoji = updateSocialEmojiSchema.parse(socialEmoji);
  try {
    const [s] = await db
      .update(socialEmojis)
      .set(newSocialEmoji)
      .where(eq(socialEmojis.id, socialEmojiId!))
      .returning();
    return { socialEmoji: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSocialEmoji = async (id: SocialEmojiId) => {
  const { id: socialEmojiId } = socialEmojiIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(socialEmojis)
      .where(eq(socialEmojis.id, socialEmojiId!))
      .returning();
    return { socialEmoji: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
