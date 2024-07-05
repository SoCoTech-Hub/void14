import { eq } from "drizzle-orm";

import type { ResourceOldId } from "../../db/schema/resourceOlds";
import { db } from "../../db/index";
import {
  resourceOldIdSchema,
  resourceOlds,
} from "../../db/schema/resourceOlds";

export const getResourceOlds = async () => {
  const rows = await db.select().from(resourceOlds);
  const r = rows;
  return { resourceOlds: r };
};

export const getResourceOldById = async (id: ResourceOldId) => {
  const { id: resourceOldId } = resourceOldIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(resourceOlds)
    .where(eq(resourceOlds.id, resourceOldId));
  if (row === undefined) return {};
  const r = row;
  return { resourceOld: r };
};
