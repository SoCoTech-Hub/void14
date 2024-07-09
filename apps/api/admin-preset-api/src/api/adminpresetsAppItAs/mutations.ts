import type {
  AdminpresetsAppItAId,
  NewAdminpresetsAppItAParams,
  UpdateAdminpresetsAppItAParams,
} from "@soco/admin-preset-db/schema/adminpresetsAppItAs";
import { db, eq } from "@soco/admin-preset-db";
import {
  adminpresetsAppItAIdSchema,
  adminpresetsAppItAs,
  insertAdminpresetsAppItASchema,
  updateAdminpresetsAppItASchema,
} from "@soco/admin-preset-db/schema/adminpresetsAppItAs";

export const createAdminpresetsAppItA = async (
  adminpresetsAppItA: NewAdminpresetsAppItAParams,
) => {
  const newAdminpresetsAppItA =
    insertAdminpresetsAppItASchema.parse(adminpresetsAppItA);
  try {
    const [a] = await db
      .insert(adminpresetsAppItAs)
      .values(newAdminpresetsAppItA)
      .returning();
    return { adminpresetsAppItA: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminpresetsAppItA = async (
  id: AdminpresetsAppItAId,
  adminpresetsAppItA: UpdateAdminpresetsAppItAParams,
) => {
  const { id: adminpresetsAppItAId } = adminpresetsAppItAIdSchema.parse({ id });
  const newAdminpresetsAppItA =
    updateAdminpresetsAppItASchema.parse(adminpresetsAppItA);
  try {
    const [a] = await db
      .update(adminpresetsAppItAs)
      .set(newAdminpresetsAppItA)
      .where(eq(adminpresetsAppItAs.id, adminpresetsAppItAId!))
      .returning();
    return { adminpresetsAppItA: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminpresetsAppItA = async (id: AdminpresetsAppItAId) => {
  const { id: adminpresetsAppItAId } = adminpresetsAppItAIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(adminpresetsAppItAs)
      .where(eq(adminpresetsAppItAs.id, adminpresetsAppItAId!))
      .returning();
    return { adminpresetsAppItA: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
