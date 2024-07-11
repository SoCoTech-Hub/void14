import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/oauth2-db";
import { db } from "@soco/oauth2-db/client";
import {
  insertOauth2AccessTokenSchema,
  NewOauth2AccessTokenParams,
  Oauth2AccessTokenId,
  oauth2AccessTokenIdSchema,
  oauth2AccessTokens,
  UpdateOauth2AccessTokenParams,
  updateOauth2AccessTokenSchema,
} from "@soco/oauth2-db/schema/oauth2AccessTokens";

export const createOauth2AccessToken = async (
  oauth2AccessToken: NewOauth2AccessTokenParams,
) => {
  const { session } = await getUserAuth();
  const newOauth2AccessToken = insertOauth2AccessTokenSchema.parse({
    ...oauth2AccessToken,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .insert(oauth2AccessTokens)
      .values(newOauth2AccessToken)
      .returning();
    return { oauth2AccessToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2AccessToken = async (
  id: Oauth2AccessTokenId,
  oauth2AccessToken: UpdateOauth2AccessTokenParams,
) => {
  const { session } = await getUserAuth();
  const { id: oauth2AccessTokenId } = oauth2AccessTokenIdSchema.parse({ id });
  const newOauth2AccessToken = updateOauth2AccessTokenSchema.parse({
    ...oauth2AccessToken,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .update(oauth2AccessTokens)
      .set({ ...newOauth2AccessToken, updatedAt: new Date() })
      .where(
        and(
          eq(oauth2AccessTokens.id, oauth2AccessTokenId!),
          eq(oauth2AccessTokens.userId, session?.user.id!),
        ),
      )
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
    const [o] = await db
      .delete(oauth2AccessTokens)
      .where(
        and(
          eq(oauth2AccessTokens.id, oauth2AccessTokenId!),
          eq(oauth2AccessTokens.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2AccessToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
