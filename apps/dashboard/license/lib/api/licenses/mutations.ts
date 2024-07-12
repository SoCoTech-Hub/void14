import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type LicenseId, 
  type NewLicenseParams,
  type UpdateLicenseParams, 
  updateLicenseSchema,
  insertLicenseSchema, 
  licenses,
  licenseIdSchema 
} from "@/lib/db/schema/licenses";

export const createLicense = async (license: NewLicenseParams) => {
  const newLicense = insertLicenseSchema.parse(license);
  try {
    const [l] =  await db.insert(licenses).values(newLicense).returning();
    return { license: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLicense = async (id: LicenseId, license: UpdateLicenseParams) => {
  const { id: licenseId } = licenseIdSchema.parse({ id });
  const newLicense = updateLicenseSchema.parse(license);
  try {
    const [l] =  await db
     .update(licenses)
     .set(newLicense)
     .where(eq(licenses.id, licenseId!))
     .returning();
    return { license: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLicense = async (id: LicenseId) => {
  const { id: licenseId } = licenseIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(licenses).where(eq(licenses.id, licenseId!))
    .returning();
    return { license: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

