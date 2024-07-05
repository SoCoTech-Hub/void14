import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertResourceOldSchema,
  NewResourceOldParams,
  ResourceOldId,
  resourceOldIdSchema,
  resourceOlds,
  UpdateResourceOldParams,
  updateResourceOldSchema,
} from "../../db/schema/resourceOlds";

export const createResourceOld = async (resourceOld: NewResourceOldParams) => {
  const newResourceOld = insertResourceOldSchema.parse(resourceOld);
  try {
    const [r] = await db
      .insert(resourceOlds)
      .values(newResourceOld)
      .returning();
    return { resourceOld: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateResourceOld = async (
  id: ResourceOldId,
  resourceOld: UpdateResourceOldParams,
) => {
  const { id: resourceOldId } = resourceOldIdSchema.parse({ id });
  const newResourceOld = updateResourceOldSchema.parse(resourceOld);
  try {
    const [r] = await db
      .update(resourceOlds)
      .set({ ...newResourceOld, updatedAt: new Date() })
      .where(eq(resourceOlds.id, resourceOldId!))
      .returning();
    return { resourceOld: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteResourceOld = async (id: ResourceOldId) => {
  const { id: resourceOldId } = resourceOldIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(resourceOlds)
      .where(eq(resourceOlds.id, resourceOldId!))
      .returning();
    return { resourceOld: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
