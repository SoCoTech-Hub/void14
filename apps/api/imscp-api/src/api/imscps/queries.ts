import { db } from "@soco/imscp-db/index";
import { eq } from "drizzle-orm";
import { type ImscpId, imscpIdSchema, imscps } from "@soco/imscp-db/schema/imscps";

export const getImscps = async () => {
  const rows = await db.select().from(imscps);
  const i = rows
  return { imscps: i };
};

export const getImscpById = async (id: ImscpId) => {
  const { id: imscpId } = imscpIdSchema.parse({ id });
  const [row] = await db.select().from(imscps).where(eq(imscps.id, imscpId));
  if (row === undefined) return {};
  const i = row;
  return { imscp: i };
};


