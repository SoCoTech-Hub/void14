import type {
  NewOauth2RefreshTokenParams,
  Oauth2RefreshTokenId,
  UpdateOauth2RefreshTokenParams,
} from "@soco/oauth2-db/schema/oauth2RefreshTokens";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/oauth2-db";
import { db } from "@soco/oauth2-db/client";
import {
  insertOauth2RefreshTokenSchema,
  oauth2RefreshTokenIdSchema,
  oauth2RefreshTokens,
  updateOauth2RefreshTokenSchema,
} from "@soco/oauth2-db/schema/oauth2RefreshTokens";

export const createOauth2RefreshToken = async (
  oauth2RefreshToken: NewOauth2RefreshTokenParams,
) => {
  const { session } = await getUserAuth();
  const newOauth2RefreshToken = insertOauth2RefreshTokenSchema.parse({
    ...oauth2RefreshToken,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .insert(oauth2RefreshTokens)
      .values(newOauth2RefreshToken)
      .returning();
    return { oauth2RefreshToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2RefreshToken = async (
  id: Oauth2RefreshTokenId,
  oauth2RefreshToken: UpdateOauth2RefreshTokenParams,
) => {
  const { session } = await getUserAuth();
  const { id: oauth2RefreshTokenId } = oauth2RefreshTokenIdSchema.parse({ id });
  const newOauth2RefreshToken = updateOauth2RefreshTokenSchema.parse({
    ...oauth2RefreshToken,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .update(oauth2RefreshTokens)
      .set({ ...newOauth2RefreshToken, updatedAt: new Date() })
      .where(
        and(
          eq(oauth2RefreshTokens.id, oauth2RefreshTokenId!),
          eq(oauth2RefreshTokens.userId, session?.user.id!),
        ),
      )
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
    const [o] = await db
      .delete(oauth2RefreshTokens)
      .where(
        and(
          eq(oauth2RefreshTokens.id, oauth2RefreshTokenId!),
          eq(oauth2RefreshTokens.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2RefreshToken: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
