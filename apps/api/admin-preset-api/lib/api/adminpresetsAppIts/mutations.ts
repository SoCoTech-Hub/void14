import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  type AdminpresetsAppItId,
  adminpresetsAppItIdSchema,
  adminpresetsAppIts,
  insertAdminpresetsAppItSchema,
  type NewAdminpresetsAppItParams,
  type UpdateAdminpresetsAppItParams,
  updateAdminpresetsAppItSchema,
} from "../../db/schema/adminpresetsAppIts";

export const createAdminpresetsAppIt = async (
  adminpresetsAppIt: NewAdminpresetsAppItParams,
) => {
  const newAdminpresetsAppIt =
    insertAdminpresetsAppItSchema.parse(adminpresetsAppIt);
  try {
    const [a] = await db
      .insert(adminpresetsAppIts)
      .values(newAdminpresetsAppIt)
      .returning();
    return { adminpresetsAppIt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminpresetsAppIt = async (
  id: AdminpresetsAppItId,
  adminpresetsAppIt: UpdateAdminpresetsAppItParams,
) => {
  const { id: adminpresetsAppItId } = adminpresetsAppItIdSchema.parse({ id });
  const newAdminpresetsAppIt =
    updateAdminpresetsAppItSchema.parse(adminpresetsAppIt);
  try {
    const [a] = await db
      .update(adminpresetsAppIts)
      .set(newAdminpresetsAppIt)
      .where(eq(adminpresetsAppIts.id, adminpresetsAppItId!))
      .returning();
    return { adminpresetsAppIt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminpresetsAppIt = async (id: AdminpresetsAppItId) => {
  const { id: adminpresetsAppItId } = adminpresetsAppItIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(adminpresetsAppIts)
      .where(eq(adminpresetsAppIts.id, adminpresetsAppItId!))
      .returning();
    return { adminpresetsAppIt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
