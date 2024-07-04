import { eq } from "drizzle-orm";

import type { AdminpresetsAppItId } from "../../db/schema/adminpresetsAppIts";
import { db } from "../../db/index";
import {
  adminpresetsAppItIdSchema,
  adminpresetsAppIts,
} from "../../db/schema/adminpresetsAppIts";
import { adminPresetsApps } from "../../db/schema/adminPresetsApps";

export const getAdminpresetsAppIts = async () => {
  const rows = await db
    .select({
      adminpresetsAppIt: adminpresetsAppIts,
      adminPresetsApp: adminPresetsApps,
    })
    .from(adminpresetsAppIts)
    .leftJoin(
      adminPresetsApps,
      eq(adminpresetsAppIts.adminPresetsAppId, adminPresetsApps.id),
    );
  const a = rows.map((r) => ({
    ...r.adminpresetsAppIt,
    adminPresetsApp: r.adminPresetsApp,
  }));
  return { adminpresetsAppIts: a };
};

export const getAdminpresetsAppItById = async (id: AdminpresetsAppItId) => {
  const { id: adminpresetsAppItId } = adminpresetsAppItIdSchema.parse({ id });
  const [row] = await db
    .select({
      adminpresetsAppIt: adminpresetsAppIts,
      adminPresetsApp: adminPresetsApps,
    })
    .from(adminpresetsAppIts)
    .where(eq(adminpresetsAppIts.id, adminpresetsAppItId))
    .leftJoin(
      adminPresetsApps,
      eq(adminpresetsAppIts.adminPresetsAppId, adminPresetsApps.id),
    );
  if (row === undefined) return {};
  const a = { ...row.adminpresetsAppIt, adminPresetsApp: row.adminPresetsApp };
  return { adminpresetsAppIt: a };
};