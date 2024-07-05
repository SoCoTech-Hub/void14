import { eq } from "drizzle-orm";

import type { SocialEmojiId } from "../../db/schema/socialEmojis";
import { db } from "../../db/index";
import {
  socialEmojiIdSchema,
  socialEmojis,
} from "../../db/schema/socialEmojis";

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
