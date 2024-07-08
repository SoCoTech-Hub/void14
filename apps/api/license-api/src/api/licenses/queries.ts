import { db } from "@soco/license-db/index";
import { eq } from "drizzle-orm";
import { type LicenseId, licenseIdSchema, licenses } from "@soco/license-db/schema/licenses";

export const getLicenses = async () => {
  const rows = await db.select().from(licenses);
  const l = rows
  return { licenses: l };
};

export const getLicenseById = async (id: LicenseId) => {
  const { id: licenseId } = licenseIdSchema.parse({ id });
  const [row] = await db.select().from(licenses).where(eq(licenses.id, licenseId));
  if (row === undefined) return {};
  const l = row;
  return { license: l };
};


