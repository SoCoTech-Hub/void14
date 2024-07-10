import { db } from "@soco/social-db/client";
import { eq, and } from "@soco/social-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type SocialId, socialIdSchema, socials } from "@soco/social-db/schema/socials";
import { socialEmojis } from "@soco/social-db/schema/socialEmojis";

export const getSocials = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ social: socials, socialEmoji: socialEmojis }).from(socials).leftJoin(socialEmojis, eq(socials.socialEmojiId, socialEmojis.id)).where(eq(socials.userId, session?.user.id!));
  const s = rows .map((r) => ({ ...r.social, socialEmoji: r.socialEmoji})); 
  return { socials: s };
};

export const getSocialById = async (id: SocialId) => {
  const { session } = await getUserAuth();
  const { id: socialId } = socialIdSchema.parse({ id });
  const [row] = await db.select({ social: socials, socialEmoji: socialEmojis }).from(socials).where(and(eq(socials.id, socialId), eq(socials.userId, session?.user.id!))).leftJoin(socialEmojis, eq(socials.socialEmojiId, socialEmojis.id));
  if (row === undefined) return {};
  const s =  { ...row.social, socialEmoji: row.socialEmoji } ;
  return { social: s };
};


