import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MnetHostId, mnetHostIdSchema, mnetHosts } from "@/lib/db/schema/mnetHosts";

export const getMnetHosts = async () => {
  const rows = await db.select().from(mnetHosts);
  const m = rows
  return { mnetHosts: m };
};

export const getMnetHostById = async (id: MnetHostId) => {
  const { id: mnetHostId } = mnetHostIdSchema.parse({ id });
  const [row] = await db.select().from(mnetHosts).where(eq(mnetHosts.id, mnetHostId));
  if (row === undefined) return {};
  const m = row;
  return { mnetHost: m };
};


