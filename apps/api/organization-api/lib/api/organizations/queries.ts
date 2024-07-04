import { eq } from "drizzle-orm";

import type { OrganizationId } from "../db/schema/organizations";
import { db } from "../db/index";
import {
  organizationIdSchema,
  organizations,
} from "../db/schema/organizations";

export const getOrganizations = async () => {
  const rows = await db.select().from(organizations);
  const o = rows;
  return { organizations: o };
};

export const getOrganizationById = async (id: OrganizationId) => {
  const { id: organizationId } = organizationIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, organizationId));
  if (row === undefined) return {};
  const o = row;
  return { organization: o };
};
