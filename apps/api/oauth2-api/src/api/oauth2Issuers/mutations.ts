import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/oauth2-db";
import { db } from "@soco/oauth2-db/client";
import {
  insertOauth2IssuerSchema,
  NewOauth2IssuerParams,
  Oauth2IssuerId,
  oauth2IssuerIdSchema,
  oauth2Issuers,
  UpdateOauth2IssuerParams,
  updateOauth2IssuerSchema,
} from "@soco/oauth2-db/schema/oauth2Issuers";

export const createOauth2Issuer = async (
  oauth2Issuer: NewOauth2IssuerParams,
) => {
  const { session } = await getUserAuth();
  const newOauth2Issuer = insertOauth2IssuerSchema.parse({
    ...oauth2Issuer,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .insert(oauth2Issuers)
      .values(newOauth2Issuer)
      .returning();
    return { oauth2Issuer: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2Issuer = async (
  id: Oauth2IssuerId,
  oauth2Issuer: UpdateOauth2IssuerParams,
) => {
  const { session } = await getUserAuth();
  const { id: oauth2IssuerId } = oauth2IssuerIdSchema.parse({ id });
  const newOauth2Issuer = updateOauth2IssuerSchema.parse({
    ...oauth2Issuer,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .update(oauth2Issuers)
      .set({ ...newOauth2Issuer, updatedAt: new Date() })
      .where(
        and(
          eq(oauth2Issuers.id, oauth2IssuerId!),
          eq(oauth2Issuers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2Issuer: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2Issuer = async (id: Oauth2IssuerId) => {
  const { session } = await getUserAuth();
  const { id: oauth2IssuerId } = oauth2IssuerIdSchema.parse({ id });
  try {
    const [o] = await db
      .delete(oauth2Issuers)
      .where(
        and(
          eq(oauth2Issuers.id, oauth2IssuerId!),
          eq(oauth2Issuers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2Issuer: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
