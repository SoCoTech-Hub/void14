import { eq } from "drizzle-orm";

import type { LicenseId } from "../../db/schema/licenses";
import { db } from "../../db/index";
import { licenseIdSchema, licenses } from "../../db/schema/licenses";

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
