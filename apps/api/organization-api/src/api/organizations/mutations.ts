import { db } from "@soco/organization-db/client";
import { eq } from "@soco/organization-db";
import { 
  type OrganizationId, 
  type NewOrganizationParams,
  type UpdateOrganizationParams, 
  updateOrganizationSchema,
  insertOrganizationSchema, 
  organizations,
  organizationIdSchema 
} from "@soco/organization-db/schema/organizations";

export const createOrganization = async (organization: NewOrganizationParams) => {
  const newOrganization = insertOrganizationSchema.parse(organization);
  try {
    const [o] =  await db.insert(organizations).values(newOrganization).returning();
    return { organization: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOrganization = async (id: OrganizationId, organization: UpdateOrganizationParams) => {
  const { id: organizationId } = organizationIdSchema.parse({ id });
  const newOrganization = updateOrganizationSchema.parse(organization);
  try {
    const [o] =  await db
     .update(organizations)
     .set(newOrganization)
     .where(eq(organizations.id, organizationId!))
     .returning();
    return { organization: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOrganization = async (id: OrganizationId) => {
  const { id: organizationId } = organizationIdSchema.parse({ id });
  try {
    const [o] =  await db.delete(organizations).where(eq(organizations.id, organizationId!))
    .returning();
    return { organization: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

