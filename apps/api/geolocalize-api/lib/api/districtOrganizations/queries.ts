import { eq } from "drizzle-orm";

import type { DistrictOrganizationId } from "../db/schema/districtOrganizations";
import { db } from "../db/index";
import {
  districtOrganizationIdSchema,
  districtOrganizations,
} from "../db/schema/districtOrganizations";
import { districts } from "../db/schema/districts";

export const getDistrictOrganizations = async () => {
  const rows = await db
    .select({
      districtOrganization: districtOrganizations,
      district: districts,
    })
    .from(districtOrganizations)
    .leftJoin(districts, eq(districtOrganizations.districtId, districts.id));
  const d = rows.map((r) => ({
    ...r.districtOrganization,
    district: r.district,
  }));
  return { districtOrganizations: d };
};

export const getDistrictOrganizationById = async (
  id: DistrictOrganizationId,
) => {
  const { id: districtOrganizationId } = districtOrganizationIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      districtOrganization: districtOrganizations,
      district: districts,
    })
    .from(districtOrganizations)
    .where(eq(districtOrganizations.id, districtOrganizationId))
    .leftJoin(districts, eq(districtOrganizations.districtId, districts.id));
  if (row === undefined) return {};
  const d = { ...row.districtOrganization, district: row.district };
  return { districtOrganization: d };
};
