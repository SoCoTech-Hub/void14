import { db } from "@soco/geolocalize-db/index";
import { eq } from "drizzle-orm";
import { type ProvinceId, provinceIdSchema, provinces } from "@soco/geolocalize-db/schema/provinces";
import { countries } from "@soco/geolocalize-db/schema/countries";

export const getProvinces = async () => {
  const rows = await db.select({ province: provinces, country: countries }).from(provinces).leftJoin(countries, eq(provinces.countryId, countries.id));
  const p = rows .map((r) => ({ ...r.province, country: r.country})); 
  return { provinces: p };
};

export const getProvinceById = async (id: ProvinceId) => {
  const { id: provinceId } = provinceIdSchema.parse({ id });
  const [row] = await db.select({ province: provinces, country: countries }).from(provinces).where(eq(provinces.id, provinceId)).leftJoin(countries, eq(provinces.countryId, countries.id));
  if (row === undefined) return {};
  const p =  { ...row.province, country: row.country } ;
  return { province: p };
};


