import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MnetService2rpcId, mnetService2rpcIdSchema, mnetService2rpcs } from "@/lib/db/schema/mnetService2rpcs";
import { mnetServices } from "@/lib/db/schema/mnetServices";
import { mnetRpcs } from "@/lib/db/schema/mnetRpcs";

export const getMnetService2rpcs = async () => {
  const rows = await db.select({ mnetService2rpc: mnetService2rpcs, mnetService: mnetServices, mnetRpc: mnetRpcs }).from(mnetService2rpcs).leftJoin(mnetServices, eq(mnetService2rpcs.mnetServiceId, mnetServices.id)).leftJoin(mnetRpcs, eq(mnetService2rpcs.mnetRpcId, mnetRpcs.id));
  const m = rows .map((r) => ({ ...r.mnetService2rpc, mnetService: r.mnetService, mnetRpc: r.mnetRpc})); 
  return { mnetService2rpcs: m };
};

export const getMnetService2rpcById = async (id: MnetService2rpcId) => {
  const { id: mnetService2rpcId } = mnetService2rpcIdSchema.parse({ id });
  const [row] = await db.select({ mnetService2rpc: mnetService2rpcs, mnetService: mnetServices, mnetRpc: mnetRpcs }).from(mnetService2rpcs).where(eq(mnetService2rpcs.id, mnetService2rpcId)).leftJoin(mnetServices, eq(mnetService2rpcs.mnetServiceId, mnetServices.id)).leftJoin(mnetRpcs, eq(mnetService2rpcs.mnetRpcId, mnetRpcs.id));
  if (row === undefined) return {};
  const m =  { ...row.mnetService2rpc, mnetService: row.mnetService, mnetRpc: row.mnetRpc } ;
  return { mnetService2rpc: m };
};


