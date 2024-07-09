import type { AdminPresetsAppId } from "@soco/admin-preset-db/schema/adminPresetsApps";
import { and, db, eq } from "@soco/admin-preset-db";
import { adminPresets } from "@soco/admin-preset-db/schema/adminPresets";
import {
  adminPresetsAppIdSchema,
  adminPresetsApps,
} from "@soco/admin-preset-db/schema/adminPresetsApps";
import { getUserAuth } from "@soco/auth-services";

export const getAdminPresetsApps = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ adminPresetsApp: adminPresetsApps, adminPreset: adminPresets })
    .from(adminPresetsApps)
    .leftJoin(adminPresets, eq(adminPresetsApps.adminPresetId, adminPresets.id))
    .where(eq(adminPresetsApps.userId, session?.user.id!));
  const a = rows.map((r) => ({
    ...r.adminPresetsApp,
    adminPreset: r.adminPreset,
  }));
  return { adminPresetsApps: a };
};

export const getAdminPresetsAppById = async (id: AdminPresetsAppId) => {
  const { session } = await getUserAuth();
  const { id: adminPresetsAppId } = adminPresetsAppIdSchema.parse({ id });
  const [row] = await db
    .select({ adminPresetsApp: adminPresetsApps, adminPreset: adminPresets })
    .from(adminPresetsApps)
    .where(
      and(
        eq(adminPresetsApps.id, adminPresetsAppId),
        eq(adminPresetsApps.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      adminPresets,
      eq(adminPresetsApps.adminPresetId, adminPresets.id),
    );
  if (row === undefined) return {};
  const a = { ...row.adminPresetsApp, adminPreset: row.adminPreset };
  return { adminPresetsApp: a };
};
