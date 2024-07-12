import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type SocialLinkId, 
  type NewSocialLinkParams,
  type UpdateSocialLinkParams, 
  updateSocialLinkSchema,
  insertSocialLinkSchema, 
  socialLinks,
  socialLinkIdSchema 
} from "@/lib/db/schema/socialLinks";

export const createSocialLink = async (socialLink: NewSocialLinkParams) => {
  const newSocialLink = insertSocialLinkSchema.parse(socialLink);
  try {
    const [s] =  await db.insert(socialLinks).values(newSocialLink).returning();
    return { socialLink: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSocialLink = async (id: SocialLinkId, socialLink: UpdateSocialLinkParams) => {
  const { id: socialLinkId } = socialLinkIdSchema.parse({ id });
  const newSocialLink = updateSocialLinkSchema.parse(socialLink);
  try {
    const [s] =  await db
     .update(socialLinks)
     .set(newSocialLink)
     .where(eq(socialLinks.id, socialLinkId!))
     .returning();
    return { socialLink: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSocialLink = async (id: SocialLinkId) => {
  const { id: socialLinkId } = socialLinkIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(socialLinks).where(eq(socialLinks.id, socialLinkId!))
    .returning();
    return { socialLink: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

