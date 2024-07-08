import { db } from "@soco/geolocalize-db/index";
import { eq } from "drizzle-orm";
import { 
  ProvinceOrganizationId, 
  NewProvinceOrganizationParams,
  UpdateProvinceOrganizationParams, 
  updateProvinceOrganizationSchema,
  insertProvinceOrganizationSchema, 
  provinceOrganizations,
  provinceOrganizationIdSchema 
} from "@soco/geolocalize-db/schema/provinceOrganizations";

export const createProvinceOrganization = async (provinceOrganization: NewProvinceOrganizationParams) => {
  const newProvinceOrganization = insertProvinceOrganizationSchema.parse(provinceOrganization);
  try {
    const [p] =  await db.insert(provinceOrganizations).values(newProvinceOrganization).returning();
    return { provinceOrganization: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateProvinceOrganization = async (id: ProvinceOrganizationId, provinceOrganization: UpdateProvinceOrganizationParams) => {
  const { id: provinceOrganizationId } = provinceOrganizationIdSchema.parse({ id });
  const newProvinceOrganization = updateProvinceOrganizationSchema.parse(provinceOrganization);
  try {
    const [p] =  await db
     .update(provinceOrganizations)
     .set(newProvinceOrganization)
     .where(eq(provinceOrganizations.id, provinceOrganizationId!))
     .returning();
    return { provinceOrganization: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteProvinceOrganization = async (id: ProvinceOrganizationId) => {
  const { id: provinceOrganizationId } = provinceOrganizationIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(provinceOrganizations).where(eq(provinceOrganizations.id, provinceOrganizationId!))
    .returning();
    return { provinceOrganization: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

