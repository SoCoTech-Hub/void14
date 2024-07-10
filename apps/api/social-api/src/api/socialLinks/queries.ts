import { db } from "@soco/social-db/client";
import { eq } from "@soco/social-db";
import { type SocialLinkId, socialLinkIdSchema, socialLinks } from "@soco/social-db/schema/socialLinks";

export const getSocialLinks = async () => {
  const rows = await db.select().from(socialLinks);
  const s = rows
  return { socialLinks: s };
};

export const getSocialLinkById = async (id: SocialLinkId) => {
  const { id: socialLinkId } = socialLinkIdSchema.parse({ id });
  const [row] = await db.select().from(socialLinks).where(eq(socialLinks.id, socialLinkId));
  if (row === undefined) return {};
  const s = row;
  return { socialLink: s };
};


