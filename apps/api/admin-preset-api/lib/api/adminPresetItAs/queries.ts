import { eq } from "drizzle-orm";

import type { AdminPresetItAId } from "../../db/schema/adminPresetItAs";
import { db } from "../../db/index";
import {
  adminPresetItAIdSchema,
  adminPresetItAs,
} from "../../db/schema/adminPresetItAs";

export const getAdminPresetItAs = async () => {
  const rows = await db.select().from(adminPresetItAs);
  const a = rows;
  return { adminPresetItAs: a };
};

export const getAdminPresetItAById = async (id: AdminPresetItAId) => {
  const { id: adminPresetItAId } = adminPresetItAIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(adminPresetItAs)
    .where(eq(adminPresetItAs.id, adminPresetItAId));
  if (row === undefined) return {};
  const a = row;
  return { adminPresetItA: a };
};
