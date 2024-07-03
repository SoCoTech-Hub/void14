import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MnetRpcId, mnetRpcIdSchema, mnetRpcs } from "@/lib/db/schema/mnetRpcs";

export const getMnetRpcs = async () => {
  const rows = await db.select().from(mnetRpcs);
  const m = rows
  return { mnetRpcs: m };
};

export const getMnetRpcById = async (id: MnetRpcId) => {
  const { id: mnetRpcId } = mnetRpcIdSchema.parse({ id });
  const [row] = await db.select().from(mnetRpcs).where(eq(mnetRpcs.id, mnetRpcId));
  if (row === undefined) return {};
  const m = row;
  return { mnetRpc: m };
};


