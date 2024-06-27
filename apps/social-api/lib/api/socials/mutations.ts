import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  SocialId, 
  NewSocialParams,
  UpdateSocialParams, 
  updateSocialSchema,
  insertSocialSchema, 
  socials,
  socialIdSchema 
} from "@/lib/db/schema/socials";
import { getUserAuth } from "@/lib/auth/utils";

export const createSocial = async (social: NewSocialParams) => {
  const { session } = await getUserAuth();
  const newSocial = insertSocialSchema.parse({ ...social, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(socials).values(newSocial).returning();
    return { social: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSocial = async (id: SocialId, social: UpdateSocialParams) => {
  const { session } = await getUserAuth();
  const { id: socialId } = socialIdSchema.parse({ id });
  const newSocial = updateSocialSchema.parse({ ...social, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(socials)
     .set(newSocial)
     .where(and(eq(socials.id, socialId!), eq(socials.userId, session?.user.id!)))
     .returning();
    return { social: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSocial = async (id: SocialId) => {
  const { session } = await getUserAuth();
  const { id: socialId } = socialIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(socials).where(and(eq(socials.id, socialId!), eq(socials.userId, session?.user.id!)))
    .returning();
    return { social: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

