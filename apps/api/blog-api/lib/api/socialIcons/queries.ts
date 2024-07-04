import { eq } from "drizzle-orm";

import type { SocialIconId } from "../db/schema/socialIcons";
import { db } from "../db/index";
import { socialIconIdSchema, socialIcons } from "../db/schema/socialIcons";

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
