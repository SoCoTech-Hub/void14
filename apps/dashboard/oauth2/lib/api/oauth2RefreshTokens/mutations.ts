import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type Oauth2RefreshTokenId, 
  type NewOauth2RefreshTokenParams,
  type UpdateOauth2RefreshTokenParams, 
  updateOauth2RefreshTokenSchema,
  insertOauth2RefreshTokenSchema, 
  oauth2RefreshTokens,
  oauth2RefreshTokenIdSchema 
} from "@/lib/db/schema/oauth2RefreshTokens";
import { getUserAuth } from "@/lib/auth/utils";

export const createOauth2RefreshToken = async (oauth2RefreshToken: NewOauth2RefreshTokenParams) => {
  const { session } = await getUserAuth();
  const newOauth2RefreshToken = insertOauth2RefreshTokenSchema.parse({ ...oauth2RefreshToken, userId: session?.user.id! });
  try {
    const [o] =  await db.insert(oauth2RefreshTokens).values(newOauth2RefreshToken).returning();
    return { oauth2RefreshToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2RefreshToken = async (id: Oauth2RefreshTokenId, oauth2RefreshToken: UpdateOauth2RefreshTokenParams) => {
  const { session } = await getUserAuth();
  const { id: oauth2RefreshTokenId } = oauth2RefreshTokenIdSchema.parse({ id });
  const newOauth2RefreshToken = updateOauth2RefreshTokenSchema.parse({ ...oauth2RefreshToken, userId: session?.user.id! });
  try {
    const [o] =  await db
     .update(oauth2RefreshTokens)
     .set({...newOauth2RefreshToken, updatedAt: new Date() })
     .where(and(eq(oauth2RefreshTokens.id, oauth2RefreshTokenId!), eq(oauth2RefreshTokens.userId, session?.user.id!)))
     .returning();
    return { oauth2RefreshToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2RefreshToken = async (id: Oauth2RefreshTokenId) => {
  const { session } = await getUserAuth();
  const { id: oauth2RefreshTokenId } = oauth2RefreshTokenIdSchema.parse({ id });
  try {
    const [o] =  await db.delete(oauth2RefreshTokens).where(and(eq(oauth2RefreshTokens.id, oauth2RefreshTokenId!), eq(oauth2RefreshTokens.userId, session?.user.id!)))
    .returning();
    return { oauth2RefreshToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

