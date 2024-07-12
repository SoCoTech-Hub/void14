import type { SocialIconId } from "@soco/blog-db/schema/socialIcons";
import { eq } from "@soco/blog-db";
import { db } from "@soco/blog-db/client";
import {
  socialIconIdSchema,
  socialIcons,
} from "@soco/blog-db/schema/socialIcons";

export const getSocialIcons = async () => {
  const rows = await db.select().from(socialIcons);
  const s = rows;
  return { socialIcons: s };
};

export const getSocialIconById = async (id: SocialIconId) => {
  const { id: socialIconId } = socialIconIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(socialIcons)
    .where(eq(socialIcons.id, socialIconId));
  if (row === undefined) return {};
  const s = row;
  return { socialIcon: s };
};
