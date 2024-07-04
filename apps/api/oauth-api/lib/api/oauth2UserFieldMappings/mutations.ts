import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertOauth2UserFieldMappingSchema,
  NewOauth2UserFieldMappingParams,
  Oauth2UserFieldMappingId,
  oauth2UserFieldMappingIdSchema,
  oauth2UserFieldMappings,
  UpdateOauth2UserFieldMappingParams,
  updateOauth2UserFieldMappingSchema,
} from "../db/schema/oauth2UserFieldMappings";

export const createOauth2UserFieldMapping = async (
  oauth2UserFieldMapping: NewOauth2UserFieldMappingParams,
) => {
  const { session } = await getUserAuth();
  const newOauth2UserFieldMapping = insertOauth2UserFieldMappingSchema.parse({
    ...oauth2UserFieldMapping,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .insert(oauth2UserFieldMappings)
      .values(newOauth2UserFieldMapping)
      .returning();
    return { oauth2UserFieldMapping: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOauth2UserFieldMapping = async (
  id: Oauth2UserFieldMappingId,
  oauth2UserFieldMapping: UpdateOauth2UserFieldMappingParams,
) => {
  const { session } = await getUserAuth();
  const { id: oauth2UserFieldMappingId } = oauth2UserFieldMappingIdSchema.parse(
    { id },
  );
  const newOauth2UserFieldMapping = updateOauth2UserFieldMappingSchema.parse({
    ...oauth2UserFieldMapping,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .update(oauth2UserFieldMappings)
      .set({ ...newOauth2UserFieldMapping, updatedAt: new Date() })
      .where(
        and(
          eq(oauth2UserFieldMappings.id, oauth2UserFieldMappingId!),
          eq(oauth2UserFieldMappings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2UserFieldMapping: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOauth2UserFieldMapping = async (
  id: Oauth2UserFieldMappingId,
) => {
  const { session } = await getUserAuth();
  const { id: oauth2UserFieldMappingId } = oauth2UserFieldMappingIdSchema.parse(
    { id },
  );
  try {
    const [o] = await db
      .delete(oauth2UserFieldMappings)
      .where(
        and(
          eq(oauth2UserFieldMappings.id, oauth2UserFieldMappingId!),
          eq(oauth2UserFieldMappings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { oauth2UserFieldMapping: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
