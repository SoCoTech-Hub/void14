import { db } from "@soco/mnet-db/index";
import { eq } from "drizzle-orm";
import { type MnetRemoteRpcId, mnetRemoteRpcIdSchema, mnetRemoteRpc } from "@soco/mnet-db/schema/mnetRemoteRpc";

export const getMnetRemoteRpcs = async () => {
  const rows = await db.select().from(mnetRemoteRpc);
  const m = rows
  return { mnetRemoteRpc: m };
};

export const getMnetRemoteRpcById = async (id: MnetRemoteRpcId) => {
  const { id: mnetRemoteRpcId } = mnetRemoteRpcIdSchema.parse({ id });
  const [row] = await db.select().from(mnetRemoteRpc).where(eq(mnetRemoteRpc.id, mnetRemoteRpcId));
  if (row === undefined) return {};
  const m = row;
  return { mnetRemoteRpc: m };
};


