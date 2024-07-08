import { db } from "@soco/mnet-db/index";
import { eq } from "drizzle-orm";
import { type MnetServiceId, mnetServiceIdSchema, mnetServices } from "@soco/mnet-db/schema/mnetServices";

export const getMnetServices = async () => {
  const rows = await db.select().from(mnetServices);
  const m = rows
  return { mnetServices: m };
};

export const getMnetServiceById = async (id: MnetServiceId) => {
  const { id: mnetServiceId } = mnetServiceIdSchema.parse({ id });
  const [row] = await db.select().from(mnetServices).where(eq(mnetServices.id, mnetServiceId));
  if (row === undefined) return {};
  const m = row;
  return { mnetService: m };
};


