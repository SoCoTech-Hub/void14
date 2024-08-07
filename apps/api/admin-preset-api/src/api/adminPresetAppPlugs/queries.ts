import type { AdminPresetAppPlugId } from "@soco/admin-preset-db/schema/adminPresetAppPlugs";
import { eq } from "@soco/admin-preset-db";
import { db } from "@soco/admin-preset-db/client";
import {
  adminPresetAppPlugIdSchema,
  adminPresetAppPlugs,
} from "@soco/admin-preset-db/schema/adminPresetAppPlugs";
import { adminPresetsApps } from "@soco/admin-preset-db/schema/adminPresetsApps";

export const getAdminPresetAppPlugs = async () => {
  const rows = await db
    .select({
      adminPresetAppPlug: adminPresetAppPlugs,
      adminPresetsApp: adminPresetsApps,
    })
    .from(adminPresetAppPlugs)
    .leftJoin(
      adminPresetsApps,
      eq(adminPresetAppPlugs.adminPresetsAppId, adminPresetsApps.id),
    );
  const a = rows.map((r) => ({
    ...r.adminPresetAppPlug,
    adminPresetsApp: r.adminPresetsApp,
  }));
  return { adminPresetAppPlugs: a };
};

export const getAdminPresetAppPlugById = async (id: AdminPresetAppPlugId) => {
  const { id: adminPresetAppPlugId } = adminPresetAppPlugIdSchema.parse({ id });
  const [row] = await db
    .select({
      adminPresetAppPlug: adminPresetAppPlugs,
      adminPresetsApp: adminPresetsApps,
    })
    .from(adminPresetAppPlugs)
    .where(eq(adminPresetAppPlugs.id, adminPresetAppPlugId))
    .leftJoin(
      adminPresetsApps,
      eq(adminPresetAppPlugs.adminPresetsAppId, adminPresetsApps.id),
    );
  if (row === undefined) return {};
  const a = { ...row.adminPresetAppPlug, adminPresetsApp: row.adminPresetsApp };
  return { adminPresetAppPlug: a };
};
