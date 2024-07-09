import type { AdminPresetPlugId } from "@soco/admin-preset-db/schema/adminPresetPlugs";
import { db, eq } from "@soco/admin-preset-db";
import {
  adminPresetPlugIdSchema,
  adminPresetPlugs,
} from "@soco/admin-preset-db/schema/adminPresetPlugs";
import { adminPresets } from "@soco/admin-preset-db/schema/adminPresets";

export const getAdminPresetPlugs = async () => {
  const rows = await db
    .select({ adminPresetPlug: adminPresetPlugs, adminPreset: adminPresets })
    .from(adminPresetPlugs)
    .leftJoin(
      adminPresets,
      eq(adminPresetPlugs.adminPresetId, adminPresets.id),
    );
  const a = rows.map((r) => ({
    ...r.adminPresetPlug,
    adminPreset: r.adminPreset,
  }));
  return { adminPresetPlugs: a };
};

export const getAdminPresetPlugById = async (id: AdminPresetPlugId) => {
  const { id: adminPresetPlugId } = adminPresetPlugIdSchema.parse({ id });
  const [row] = await db
    .select({ adminPresetPlug: adminPresetPlugs, adminPreset: adminPresets })
    .from(adminPresetPlugs)
    .where(eq(adminPresetPlugs.id, adminPresetPlugId))
    .leftJoin(
      adminPresets,
      eq(adminPresetPlugs.adminPresetId, adminPresets.id),
    );
  if (row === undefined) return {};
  const a = { ...row.adminPresetPlug, adminPreset: row.adminPreset };
  return { adminPresetPlug: a };
};
