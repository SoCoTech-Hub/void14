import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  Oauth2AccessTokenId, 
  NewOauth2AccessTokenParams,
  UpdateOauth2AccessTokenParams, 
  updateOauth2AccessTokenSchema,
  insertOauth2AccessTokenSchema, 
  oauth2AccessTokens,
  oauth2AccessTokenIdSchema 
} from "@/lib/db/schema/oauth2AccessTokens";
import { getUserAuth } from "@soco/auth/utils";

export const createOauth2AccessToken = async (oauth2AccessToken: NewOauth2AccessTokenParams) => {
  const { session } = await getUserAuth();
  const newOauth2AccessToken = insertOauth2AccessTokenSchema.parse({ ...oauth2AccessToken, userId: session?.user.id! });
  try {
    const [o] =  await db.insert(oauth2AccessTokens).values(newOauth2AccessToken).returning();
    return { oauth2AccessToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2AccessToken = async (id: Oauth2AccessTokenId, oauth2AccessToken: UpdateOauth2AccessTokenParams) => {
  const { session } = await getUserAuth();
  const { id: oauth2AccessTokenId } = oauth2AccessTokenIdSchema.parse({ id });
  const newOauth2AccessToken = updateOauth2AccessTokenSchema.parse({ ...oauth2AccessToken, userId: session?.user.id! });
  try {
    const [o] =  await db
     .update(oauth2AccessTokens)
     .set({...newOauth2AccessToken, updatedAt: new Date() })
     .where(and(eq(oauth2AccessTokens.id, oauth2AccessTokenId!), eq(oauth2AccessTokens.userId, session?.user.id!)))
     .returning();
    return { oauth2AccessToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2AccessToken = async (id: Oauth2AccessTokenId) => {
  const { session } = await getUserAuth();
  const { id: oauth2AccessTokenId } = oauth2AccessTokenIdSchema.parse({ id });
  try {
    const [o] =  await db.delete(oauth2AccessTokens).where(and(eq(oauth2AccessTokens.id, oauth2AccessTokenId!), eq(oauth2AccessTokens.userId, session?.user.id!)))
    .returning();
    return { oauth2AccessToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

