import type {
  NewOauth2SystemAccountParams,
  Oauth2SystemAccountId,
  UpdateOauth2SystemAccountParams,
} from "@soco/oauth2-db/schema/oauth2SystemAccounts";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/oauth2-db";
import { db } from "@soco/oauth2-db/client";
import {
  insertOauth2SystemAccountSchema,
  oauth2SystemAccountIdSchema,
  oauth2SystemAccounts,
  updateOauth2SystemAccountSchema,
} from "@soco/oauth2-db/schema/oauth2SystemAccounts";

export const createOauth2SystemAccount = async (
  oauth2SystemAccount: NewOauth2SystemAccountParams,
) => {
  const { session } = await getUserAuth();
  const newOauth2SystemAccount = insertOauth2SystemAccountSchema.parse({
    ...oauth2SystemAccount,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .insert(oauth2SystemAccounts)
      .values(newOauth2SystemAccount)
      .returning();
    return { oauth2SystemAccount: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2SystemAccount = async (
  id: Oauth2SystemAccountId,
  oauth2SystemAccount: UpdateOauth2SystemAccountParams,
) => {
  const { session } = await getUserAuth();
  const { id: oauth2SystemAccountId } = oauth2SystemAccountIdSchema.parse({
    id,
  });
  const newOauth2SystemAccount = updateOauth2SystemAccountSchema.parse({
    ...oauth2SystemAccount,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .update(oauth2SystemAccounts)
      .set({ ...newOauth2SystemAccount, updatedAt: new Date() })
      .where(
        and(
          eq(oauth2SystemAccounts.id, oauth2SystemAccountId!),
          eq(oauth2SystemAccounts.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2SystemAccount: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2SystemAccount = async (id: Oauth2SystemAccountId) => {
  const { session } = await getUserAuth();
  const { id: oauth2SystemAccountId } = oauth2SystemAccountIdSchema.parse({
    id,
  });
  try {
    const [o] = await db
      .delete(oauth2SystemAccounts)
      .where(
        and(
          eq(oauth2SystemAccounts.id, oauth2SystemAccountId!),
          eq(oauth2SystemAccounts.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2SystemAccount: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
