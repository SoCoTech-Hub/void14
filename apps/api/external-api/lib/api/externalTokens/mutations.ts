import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  ExternalTokenId,
  externalTokenIdSchema,
  externalTokens,
  insertExternalTokenSchema,
  NewExternalTokenParams,
  UpdateExternalTokenParams,
  updateExternalTokenSchema,
} from "../db/schema/externalTokens";

export const createExternalToken = async (
  externalToken: NewExternalTokenParams,
) => {
  const { session } = await getUserAuth();
  const newExternalToken = insertExternalTokenSchema.parse({
    ...externalToken,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(externalTokens)
      .values(newExternalToken)
      .returning();
    return { externalToken: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateExternalToken = async (
  id: ExternalTokenId,
  externalToken: UpdateExternalTokenParams,
) => {
  const { session } = await getUserAuth();
  const { id: externalTokenId } = externalTokenIdSchema.parse({ id });
  const newExternalToken = updateExternalTokenSchema.parse({
    ...externalToken,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(externalTokens)
      .set({ ...newExternalToken, updatedAt: new Date() })
      .where(
        and(
          eq(externalTokens.id, externalTokenId!),
          eq(externalTokens.userId, session?.user.id!),
        ),
      )
      .returning();
    return { externalToken: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteExternalToken = async (id: ExternalTokenId) => {
  const { session } = await getUserAuth();
  const { id: externalTokenId } = externalTokenIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(externalTokens)
      .where(
        and(
          eq(externalTokens.id, externalTokenId!),
          eq(externalTokens.userId, session?.user.id!),
        ),
      )
      .returning();
    return { externalToken: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
