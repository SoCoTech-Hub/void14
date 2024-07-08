import { db } from "@soco/social-db/index";
import { and, eq } from "drizzle-orm";
import { 
  SocialShareId, 
  NewSocialShareParams,
  UpdateSocialShareParams, 
  updateSocialShareSchema,
  insertSocialShareSchema, 
  socialShares,
  socialShareIdSchema 
} from "@soco/social-db/schema/socialShares";
import { getUserAuth } from "@/lib/auth/utils";

export const createSocialShare = async (socialShare: NewSocialShareParams) => {
  const { session } = await getUserAuth();
  const newSocialShare = insertSocialShareSchema.parse({ ...socialShare, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(socialShares).values(newSocialShare).returning();
    return { socialShare: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSocialShare = async (id: SocialShareId, socialShare: UpdateSocialShareParams) => {
  const { session } = await getUserAuth();
  const { id: socialShareId } = socialShareIdSchema.parse({ id });
  const newSocialShare = updateSocialShareSchema.parse({ ...socialShare, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(socialShares)
     .set(newSocialShare)
     .where(and(eq(socialShares.id, socialShareId!), eq(socialShares.userId, session?.user.id!)))
     .returning();
    return { socialShare: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSocialShare = async (id: SocialShareId) => {
  const { session } = await getUserAuth();
  const { id: socialShareId } = socialShareIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(socialShares).where(and(eq(socialShares.id, socialShareId!), eq(socialShares.userId, session?.user.id!)))
    .returning();
    return { socialShare: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

