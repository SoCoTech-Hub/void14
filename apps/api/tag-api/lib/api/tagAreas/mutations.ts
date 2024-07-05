import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertTagAreaSchema,
  NewTagAreaParams,
  TagAreaId,
  tagAreaIdSchema,
  tagAreas,
  UpdateTagAreaParams,
  updateTagAreaSchema,
} from "../../db/schema/tagAreas";

export const createTagArea = async (tagArea: NewTagAreaParams) => {
  const newTagArea = insertTagAreaSchema.parse(tagArea);
  try {
    const [t] = await db.insert(tagAreas).values(newTagArea).returning();
    return { tagArea: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTagArea = async (
  id: TagAreaId,
  tagArea: UpdateTagAreaParams,
) => {
  const { id: tagAreaId } = tagAreaIdSchema.parse({ id });
  const newTagArea = updateTagAreaSchema.parse(tagArea);
  try {
    const [t] = await db
      .update(tagAreas)
      .set(newTagArea)
      .where(eq(tagAreas.id, tagAreaId!))
      .returning();
    return { tagArea: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTagArea = async (id: TagAreaId) => {
  const { id: tagAreaId } = tagAreaIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(tagAreas)
      .where(eq(tagAreas.id, tagAreaId!))
      .returning();
    return { tagArea: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
