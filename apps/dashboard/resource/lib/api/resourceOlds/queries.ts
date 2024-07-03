import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ResourceOldId, resourceOldIdSchema, resourceOlds } from "@/lib/db/schema/resourceOlds";

export const getResourceOlds = async () => {
  const rows = await db.select().from(resourceOlds);
  const r = rows
  return { resourceOlds: r };
};

export const getResourceOldById = async (id: ResourceOldId) => {
  const { id: resourceOldId } = resourceOldIdSchema.parse({ id });
  const [row] = await db.select().from(resourceOlds).where(eq(resourceOlds.id, resourceOldId));
  if (row === undefined) return {};
  const r = row;
  return { resourceOld: r };
};


