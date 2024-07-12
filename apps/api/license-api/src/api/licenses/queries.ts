import type { LicenseId } from "@soco/license-db/schema/licenses";
import { eq } from "@soco/license-db";
import { db } from "@soco/license-db/client";
import { licenseIdSchema, licenses } from "@soco/license-db/schema/licenses";

export const getLicenses = async () => {
  const rows = await db.select().from(licenses);
  const l = rows;
  return { licenses: l };
};

export const getLicenseById = async (id: LicenseId) => {
  const { id: licenseId } = licenseIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(licenses)
    .where(eq(licenses.id, licenseId));
  if (row === undefined) return {};
  const l = row;
  return { license: l };
};
