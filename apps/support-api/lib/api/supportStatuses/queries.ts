import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SupportStatusId, supportStatusIdSchema, supportStatuses } from "@/lib/db/schema/supportStatuses";

export const getSupportStatuses = async () => {
  const rows = await db.select().from(supportStatuses);
  const s = rows
  return { supportStatuses: s };
};

export const getSupportStatusById = async (id: SupportStatusId) => {
  const { id: supportStatusId } = supportStatusIdSchema.parse({ id });
  const [row] = await db.select().from(supportStatuses).where(eq(supportStatuses.id, supportStatusId));
  if (row === undefined) return {};
  const s = row;
  return { supportStatus: s };
};


