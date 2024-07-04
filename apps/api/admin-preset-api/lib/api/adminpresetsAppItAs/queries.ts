import { eq } from "drizzle-orm";

import type { AdminpresetsAppItAId } from "../../db/schema/adminpresetsAppItAs";
import { db } from "../../db/index";
import {
  adminpresetsAppItAIdSchema,
  adminpresetsAppItAs,
} from "../../db/schema/adminpresetsAppItAs";
import { adminPresetsApps } from "../../db/schema/adminPresetsApps";

export const getAdminpresetsAppItAs = async () => {
  const rows = await db
    .select({
      adminpresetsAppItA: adminpresetsAppItAs,
      adminPresetsApp: adminPresetsApps,
    })
    .from(adminpresetsAppItAs)
    .leftJoin(
      adminPresetsApps,
      eq(adminpresetsAppItAs.adminPresetsAppId, adminPresetsApps.id),
    );
  const a = rows.map((r) => ({
    ...r.adminpresetsAppItA,
    adminPresetsApp: r.adminPresetsApp,
  }));
  return { adminpresetsAppItAs: a };
};

export const getAdminpresetsAppItAById = async (id: AdminpresetsAppItAId) => {
  const { id: adminpresetsAppItAId } = adminpresetsAppItAIdSchema.parse({ id });
  const [row] = await db
    .select({
      adminpresetsAppItA: adminpresetsAppItAs,
      adminPresetsApp: adminPresetsApps,
    })
    .from(adminpresetsAppItAs)
    .where(eq(adminpresetsAppItAs.id, adminpresetsAppItAId))
    .leftJoin(
      adminPresetsApps,
      eq(adminpresetsAppItAs.adminPresetsAppId, adminPresetsApps.id),
    );
  if (row === undefined) return {};
  const a = { ...row.adminpresetsAppItA, adminPresetsApp: row.adminPresetsApp };
  return { adminpresetsAppItA: a };
};
