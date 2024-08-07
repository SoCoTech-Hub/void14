import type {
  NewTagCorrelationParams,
  TagCorrelationId,
  UpdateTagCorrelationParams,
} from "@soco/tag-db/schema/tagCorrelations";
import { eq } from "@soco/tag-db";
import { db } from "@soco/tag-db/client";
import {
  insertTagCorrelationSchema,
  tagCorrelationIdSchema,
  tagCorrelations,
  updateTagCorrelationSchema,
} from "@soco/tag-db/schema/tagCorrelations";

export const createTagCorrelation = async (
  tagCorrelation: NewTagCorrelationParams,
) => {
  const newTagCorrelation = insertTagCorrelationSchema.parse(tagCorrelation);
  try {
    const [t] = await db
      .insert(tagCorrelations)
      .values(newTagCorrelation)
      .returning();
    return { tagCorrelation: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTagCorrelation = async (
  id: TagCorrelationId,
  tagCorrelation: UpdateTagCorrelationParams,
) => {
  const { id: tagCorrelationId } = tagCorrelationIdSchema.parse({ id });
  const newTagCorrelation = updateTagCorrelationSchema.parse(tagCorrelation);
  try {
    const [t] = await db
      .update(tagCorrelations)
      .set(newTagCorrelation)
      .where(eq(tagCorrelations.id, tagCorrelationId!))
      .returning();
    return { tagCorrelation: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTagCorrelation = async (id: TagCorrelationId) => {
  const { id: tagCorrelationId } = tagCorrelationIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(tagCorrelations)
      .where(eq(tagCorrelations.id, tagCorrelationId!))
      .returning();
    return { tagCorrelation: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
