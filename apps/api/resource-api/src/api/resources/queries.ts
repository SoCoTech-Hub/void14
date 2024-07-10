import { db } from "@soco/resource-db/client";
import { eq } from "@soco/resource-db";
import { type ResourceId, resourceIdSchema, resources } from "@soco/resource-db/schema/resources";

export const getResources = async () => {
  const rows = await db.select().from(resources);
  const r = rows
  return { resources: r };
};

export const getResourceById = async (id: ResourceId) => {
  const { id: resourceId } = resourceIdSchema.parse({ id });
  const [row] = await db.select().from(resources).where(eq(resources.id, resourceId));
  if (row === undefined) return {};
  const r = row;
  return { resource: r };
};


