import { eq } from "drizzle-orm";

import type { SocialLinkId } from "../db/schema/socialLinks";
import { db } from "../db/index";
import { socialLinkIdSchema, socialLinks } from "../db/schema/socialLinks";

export const getSocialLinks = async () => {
  const rows = await db.select().from(socialLinks);
  const s = rows;
  return { socialLinks: s };
};

export const getSocialLinkById = async (id: SocialLinkId) => {
  const { id: socialLinkId } = socialLinkIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(socialLinks)
    .where(eq(socialLinks.id, socialLinkId));
  if (row === undefined) return {};
  const s = row;
  return { socialLink: s };
};
