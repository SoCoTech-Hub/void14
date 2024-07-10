import { db } from "@soco/admin-preset-db/client";
import { eq } from "@soco/admin-preset-db";
import { type AdminPresetItAId, adminPresetItAIdSchema, adminPresetItAs } from "@soco/admin-preset-db/schema/adminPresetItAs";

export const getAdminPresetItAs = async () => {
  const rows = await db.select().from(adminPresetItAs);
  const a = rows
  return { adminPresetItAs: a };
};

export const getAdminPresetItAById = async (id: AdminPresetItAId) => {
  const { id: adminPresetItAId } = adminPresetItAIdSchema.parse({ id });
  const [row] = await db.select().from(adminPresetItAs).where(eq(adminPresetItAs.id, adminPresetItAId));
  if (row === undefined) return {};
  const a = row;
  return { adminPresetItA: a };
};


