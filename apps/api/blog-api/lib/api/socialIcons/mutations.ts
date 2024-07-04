import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertSocialIconSchema,
  NewSocialIconParams,
  SocialIconId,
  socialIconIdSchema,
  socialIcons,
  UpdateSocialIconParams,
  updateSocialIconSchema,
} from "../db/schema/socialIcons";

export const createSocialIcon = async (socialIcon: NewSocialIconParams) => {
  const newSocialIcon = insertSocialIconSchema.parse(socialIcon);
  try {
    const [s] = await db.insert(socialIcons).values(newSocialIcon).returning();
    return { socialIcon: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSocialIcon = async (
  id: SocialIconId,
  socialIcon: UpdateSocialIconParams,
) => {
  const { id: socialIconId } = socialIconIdSchema.parse({ id });
  const newSocialIcon = updateSocialIconSchema.parse(socialIcon);
  try {
    const [s] = await db
      .update(socialIcons)
      .set(newSocialIcon)
      .where(eq(socialIcons.id, socialIconId!))
      .returning();
    return { socialIcon: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSocialIcon = async (id: SocialIconId) => {
  const { id: socialIconId } = socialIconIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(socialIcons)
      .where(eq(socialIcons.id, socialIconId!))
      .returning();
    return { socialIcon: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
