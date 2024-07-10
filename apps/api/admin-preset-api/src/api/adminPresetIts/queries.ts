import { db } from "@soco/admin-preset-db/client";
import { eq } from "@soco/admin-preset-db";
import { type AdminPresetItId, adminPresetItIdSchema, adminPresetIts } from "@soco/admin-preset-db/schema/adminPresetIts";
import { adminPresetsApps } from "@soco/admin-preset-db/schema/adminPresetsApps";

export const getAdminPresetIts = async () => {
  const rows = await db.select({ adminPresetIt: adminPresetIts, adminPresetsApp: adminPresetsApps }).from(adminPresetIts).leftJoin(adminPresetsApps, eq(adminPresetIts.adminPresetsAppId, adminPresetsApps.id));
  const a = rows .map((r) => ({ ...r.adminPresetIt, adminPresetsApp: r.adminPresetsApp})); 
  return { adminPresetIts: a };
};

export const getAdminPresetItById = async (id: AdminPresetItId) => {
  const { id: adminPresetItId } = adminPresetItIdSchema.parse({ id });
  const [row] = await db.select({ adminPresetIt: adminPresetIts, adminPresetsApp: adminPresetsApps }).from(adminPresetIts).where(eq(adminPresetIts.id, adminPresetItId)).leftJoin(adminPresetsApps, eq(adminPresetIts.adminPresetsAppId, adminPresetsApps.id));
  if (row === undefined) return {};
  const a =  { ...row.adminPresetIt, adminPresetsApp: row.adminPresetsApp } ;
  return { adminPresetIt: a };
};


