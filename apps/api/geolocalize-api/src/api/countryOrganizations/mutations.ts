import { db } from "@soco/geolocalize-db/index";
import { eq } from "drizzle-orm";
import { 
  CountryOrganizationId, 
  NewCountryOrganizationParams,
  UpdateCountryOrganizationParams, 
  updateCountryOrganizationSchema,
  insertCountryOrganizationSchema, 
  countryOrganizations,
  countryOrganizationIdSchema 
} from "@soco/geolocalize-db/schema/countryOrganizations";

export const createCountryOrganization = async (countryOrganization: NewCountryOrganizationParams) => {
  const newCountryOrganization = insertCountryOrganizationSchema.parse(countryOrganization);
  try {
    const [c] =  await db.insert(countryOrganizations).values(newCountryOrganization).returning();
    return { countryOrganization: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCountryOrganization = async (id: CountryOrganizationId, countryOrganization: UpdateCountryOrganizationParams) => {
  const { id: countryOrganizationId } = countryOrganizationIdSchema.parse({ id });
  const newCountryOrganization = updateCountryOrganizationSchema.parse(countryOrganization);
  try {
    const [c] =  await db
     .update(countryOrganizations)
     .set(newCountryOrganization)
     .where(eq(countryOrganizations.id, countryOrganizationId!))
     .returning();
    return { countryOrganization: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCountryOrganization = async (id: CountryOrganizationId) => {
  const { id: countryOrganizationId } = countryOrganizationIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(countryOrganizations).where(eq(countryOrganizations.id, countryOrganizationId!))
    .returning();
    return { countryOrganization: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

