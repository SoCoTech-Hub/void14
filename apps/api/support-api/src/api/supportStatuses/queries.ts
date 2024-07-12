import type { SupportStatusId } from "@soco/support-db/schema/supportStatuses";
import { eq } from "@soco/support-db";
import { db } from "@soco/support-db/client";
import {
  supportStatuses,
  supportStatusIdSchema,
} from "@soco/support-db/schema/supportStatuses";

export const getSupportStatuses = async () => {
  const rows = await db.select().from(supportStatuses);
  const s = rows;
  return { supportStatuses: s };
};

export const getSupportStatusById = async (id: SupportStatusId) => {
  const { id: supportStatusId } = supportStatusIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(supportStatuses)
    .where(eq(supportStatuses.id, supportStatusId));
  if (row === undefined) return {};
  const s = row;
  return { supportStatus: s };
};
