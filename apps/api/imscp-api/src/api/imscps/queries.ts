import type { ImscpId } from "@soco/imscp-db/schema/imscps";
import { eq } from "@soco/imscp-db";
import { db } from "@soco/imscp-db/client";
import { imscpIdSchema, imscps } from "@soco/imscp-db/schema/imscps";

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
