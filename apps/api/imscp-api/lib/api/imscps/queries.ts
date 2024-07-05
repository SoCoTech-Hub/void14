import { eq } from "drizzle-orm";

import type { ImscpId } from "../../db/schema/imscps";
import { db } from "../../db/index";
import { imscpIdSchema, imscps } from "../../db/schema/imscps";

export const getImscps = async () => {
  const rows = await db.select().from(imscps);
  const i = rows;
  return { imscps: i };
};

export const getImscpById = async (id: ImscpId) => {
  const { id: imscpId } = imscpIdSchema.parse({ id });
  const [row] = await db.select().from(imscps).where(eq(imscps.id, imscpId));
  if (row === undefined) return {};
  const i = row;
  return { imscp: i };
};
