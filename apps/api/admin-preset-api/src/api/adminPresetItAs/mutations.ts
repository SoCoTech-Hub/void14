import { db } from "@soco/admin-preset-db/client";
import { eq } from "@soco/admin-preset-db";
import { 
  AdminPresetItAId, 
  NewAdminPresetItAParams,
  UpdateAdminPresetItAParams, 
  updateAdminPresetItASchema,
  insertAdminPresetItASchema, 
  adminPresetItAs,
  adminPresetItAIdSchema 
} from "@soco/admin-preset-db/schema/adminPresetItAs";

export const createAdminPresetItA = async (adminPresetItA: NewAdminPresetItAParams) => {
  const newAdminPresetItA = insertAdminPresetItASchema.parse(adminPresetItA);
  try {
    const [a] =  await db.insert(adminPresetItAs).values(newAdminPresetItA).returning();
    return { adminPresetItA: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminPresetItA = async (id: AdminPresetItAId, adminPresetItA: UpdateAdminPresetItAParams) => {
  const { id: adminPresetItAId } = adminPresetItAIdSchema.parse({ id });
  const newAdminPresetItA = updateAdminPresetItASchema.parse(adminPresetItA);
  try {
    const [a] =  await db
     .update(adminPresetItAs)
     .set(newAdminPresetItA)
     .where(eq(adminPresetItAs.id, adminPresetItAId!))
     .returning();
    return { adminPresetItA: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminPresetItA = async (id: AdminPresetItAId) => {
  const { id: adminPresetItAId } = adminPresetItAIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(adminPresetItAs).where(eq(adminPresetItAs.id, adminPresetItAId!))
    .returning();
    return { adminPresetItA: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

