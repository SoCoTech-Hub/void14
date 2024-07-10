import { db } from "@soco/admin-preset-db/client";
import { eq } from "@soco/admin-preset-db";
import { type AdminpresetsAppItAId, adminpresetsAppItAIdSchema, adminpresetsAppItAs } from "@soco/admin-preset-db/schema/adminpresetsAppItAs";
import { adminPresetsApps } from "@soco/admin-preset-db/schema/adminPresetsApps";

export const getAdminpresetsAppItAs = async () => {
  const rows = await db.select({ adminpresetsAppItA: adminpresetsAppItAs, adminPresetsApp: adminPresetsApps }).from(adminpresetsAppItAs).leftJoin(adminPresetsApps, eq(adminpresetsAppItAs.adminPresetsAppId, adminPresetsApps.id));
  const a = rows .map((r) => ({ ...r.adminpresetsAppItA, adminPresetsApp: r.adminPresetsApp})); 
  return { adminpresetsAppItAs: a };
};

export const getAdminpresetsAppItAById = async (id: AdminpresetsAppItAId) => {
  const { id: adminpresetsAppItAId } = adminpresetsAppItAIdSchema.parse({ id });
  const [row] = await db.select({ adminpresetsAppItA: adminpresetsAppItAs, adminPresetsApp: adminPresetsApps }).from(adminpresetsAppItAs).where(eq(adminpresetsAppItAs.id, adminpresetsAppItAId)).leftJoin(adminPresetsApps, eq(adminpresetsAppItAs.adminPresetsAppId, adminPresetsApps.id));
  if (row === undefined) return {};
  const a =  { ...row.adminpresetsAppItA, adminPresetsApp: row.adminPresetsApp } ;
  return { adminpresetsAppItA: a };
};


