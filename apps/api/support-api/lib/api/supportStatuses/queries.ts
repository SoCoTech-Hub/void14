import { eq } from "drizzle-orm";

import type { SupportStatusId } from "../../db/schema/supportStatuses";
import { db } from "../../db/index";
import {
  supportStatuses,
  supportStatusIdSchema,
} from "../../db/schema/supportStatuses";

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
