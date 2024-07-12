import type { ProvinceOrganizationId } from "@soco/geolocalize-db/schema/provinceOrganizations";
import { eq } from "@soco/geolocalize-db";
import { db } from "@soco/geolocalize-db/client";
import {
  provinceOrganizationIdSchema,
  provinceOrganizations,
} from "@soco/geolocalize-db/schema/provinceOrganizations";
import { provinces } from "@soco/geolocalize-db/schema/provinces";

export const getProvinceOrganizations = async () => {
  const rows = await db
    .select({
      provinceOrganization: provinceOrganizations,
      province: provinces,
    })
    .from(provinceOrganizations)
    .leftJoin(provinces, eq(provinceOrganizations.provinceId, provinces.id));
  const p = rows.map((r) => ({
    ...r.provinceOrganization,
    province: r.province,
  }));
  return { provinceOrganizations: p };
};

export const getProvinceOrganizationById = async (
  id: ProvinceOrganizationId,
) => {
  const { id: provinceOrganizationId } = provinceOrganizationIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      provinceOrganization: provinceOrganizations,
      province: provinces,
    })
    .from(provinceOrganizations)
    .where(eq(provinceOrganizations.id, provinceOrganizationId))
    .leftJoin(provinces, eq(provinceOrganizations.provinceId, provinces.id));
  if (row === undefined) return {};
  const p = { ...row.provinceOrganization, province: row.province };
  return { provinceOrganization: p };
};
