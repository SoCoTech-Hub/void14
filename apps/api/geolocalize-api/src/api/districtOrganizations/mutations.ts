import { db } from "@soco/geolocalize-db/index";
import { eq } from "drizzle-orm";
import { 
  DistrictOrganizationId, 
  NewDistrictOrganizationParams,
  UpdateDistrictOrganizationParams, 
  updateDistrictOrganizationSchema,
  insertDistrictOrganizationSchema, 
  districtOrganizations,
  districtOrganizationIdSchema 
} from "@soco/geolocalize-db/schema/districtOrganizations";

export const createDistrictOrganization = async (districtOrganization: NewDistrictOrganizationParams) => {
  const newDistrictOrganization = insertDistrictOrganizationSchema.parse(districtOrganization);
  try {
    const [d] =  await db.insert(districtOrganizations).values(newDistrictOrganization).returning();
    return { districtOrganization: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDistrictOrganization = async (id: DistrictOrganizationId, districtOrganization: UpdateDistrictOrganizationParams) => {
  const { id: districtOrganizationId } = districtOrganizationIdSchema.parse({ id });
  const newDistrictOrganization = updateDistrictOrganizationSchema.parse(districtOrganization);
  try {
    const [d] =  await db
     .update(districtOrganizations)
     .set(newDistrictOrganization)
     .where(eq(districtOrganizations.id, districtOrganizationId!))
     .returning();
    return { districtOrganization: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDistrictOrganization = async (id: DistrictOrganizationId) => {
  const { id: districtOrganizationId } = districtOrganizationIdSchema.parse({ id });
  try {
    const [d] =  await db.delete(districtOrganizations).where(eq(districtOrganizations.id, districtOrganizationId!))
    .returning();
    return { districtOrganization: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

