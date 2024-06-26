import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ProvinceOrganizationId, provinceOrganizationIdSchema, provinceOrganizations } from "@/lib/db/schema/provinceOrganizations";
import { provinces } from "@/lib/db/schema/provinces";

export const getProvinceOrganizations = async () => {
  const rows = await db.select({ provinceOrganization: provinceOrganizations, province: provinces }).from(provinceOrganizations).leftJoin(provinces, eq(provinceOrganizations.provinceId, provinces.id));
  const p = rows .map((r) => ({ ...r.provinceOrganization, province: r.province})); 
  return { provinceOrganizations: p };
};

export const getProvinceOrganizationById = async (id: ProvinceOrganizationId) => {
  const { id: provinceOrganizationId } = provinceOrganizationIdSchema.parse({ id });
  const [row] = await db.select({ provinceOrganization: provinceOrganizations, province: provinces }).from(provinceOrganizations).where(eq(provinceOrganizations.id, provinceOrganizationId)).leftJoin(provinces, eq(provinceOrganizations.provinceId, provinces.id));
  if (row === undefined) return {};
  const p =  { ...row.provinceOrganization, province: row.province } ;
  return { provinceOrganization: p };
};


