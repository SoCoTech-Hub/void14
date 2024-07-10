import { db } from "@soco/mnet-db/client";
import { eq } from "@soco/mnet-db";
import { type MnetRemoteService2rpcId, mnetRemoteService2rpcIdSchema, mnetRemoteService2rpcs } from "@soco/mnet-db/schema/mnetRemoteService2rpcs";

export const getMnetRemoteService2rpcs = async () => {
  const rows = await db.select().from(mnetRemoteService2rpcs);
  const m = rows
  return { mnetRemoteService2rpcs: m };
};

export const getMnetRemoteService2rpcById = async (id: MnetRemoteService2rpcId) => {
  const { id: mnetRemoteService2rpcId } = mnetRemoteService2rpcIdSchema.parse({ id });
  const [row] = await db.select().from(mnetRemoteService2rpcs).where(eq(mnetRemoteService2rpcs.id, mnetRemoteService2rpcId));
  if (row === undefined) return {};
  const m = row;
  return { mnetRemoteService2rpc: m };
};


