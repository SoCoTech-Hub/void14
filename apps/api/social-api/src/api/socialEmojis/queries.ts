import type { SocialEmojiId } from "@soco/social-db/schema/socialEmojis";
import { eq } from "@soco/social-db";
import { db } from "@soco/social-db/client";
import {
  socialEmojiIdSchema,
  socialEmojis,
} from "@soco/social-db/schema/socialEmojis";

export const getSocialEmojis = async () => {
  const rows = await db.select().from(socialEmojis);
  const s = rows;
  return { socialEmojis: s };
};

export const getSocialEmojiById = async (id: SocialEmojiId) => {
  const { id: socialEmojiId } = socialEmojiIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(socialEmojis)
    .where(eq(socialEmojis.id, socialEmojiId));
  if (row === undefined) return {};
  const s = row;
  return { socialEmoji: s };
};
