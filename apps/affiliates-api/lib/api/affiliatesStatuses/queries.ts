import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AffiliatesStatusId, affiliatesStatusIdSchema, affiliatesStatuses } from "@/lib/db/schema/affiliatesStatuses";

export const getAffiliatesStatuses = async () => {
  const rows = await db.select().from(affiliatesStatuses);
  const a = rows
  return { affiliatesStatuses: a };
};

export const getAffiliatesStatusById = async (id: AffiliatesStatusId) => {
  const { id: affiliatesStatusId } = affiliatesStatusIdSchema.parse({ id });
  const [row] = await db.select().from(affiliatesStatuses).where(eq(affiliatesStatuses.id, affiliatesStatusId));
  if (row === undefined) return {};
  const a = row;
  return { affiliatesStatus: a };
};


