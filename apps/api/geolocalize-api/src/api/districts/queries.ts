import type { DistrictId } from "@soco/geolocalize-db/schema/districts";
import { eq } from "@soco/geolocalize-db";
import { db } from "@soco/geolocalize-db/client";
import {
  districtIdSchema,
  districts,
} from "@soco/geolocalize-db/schema/districts";
import { provinces } from "@soco/geolocalize-db/schema/provinces";

export const getDistricts = async () => {
  const rows = await db
    .select({ district: districts, province: provinces })
    .from(districts)
    .leftJoin(provinces, eq(districts.provinceId, provinces.id));
  const d = rows.map((r) => ({ ...r.district, province: r.province }));
  return { districts: d };
};

export const getDistrictById = async (id: DistrictId) => {
  const { id: districtId } = districtIdSchema.parse({ id });
  const [row] = await db
    .select({ district: districts, province: provinces })
    .from(districts)
    .where(eq(districts.id, districtId))
    .leftJoin(provinces, eq(districts.provinceId, provinces.id));
  if (row === undefined) return {};
  const d = { ...row.district, province: row.province };
  return { district: d };
};
