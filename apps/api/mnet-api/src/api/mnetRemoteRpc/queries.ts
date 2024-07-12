import type { MnetRemoteRpcId } from "@soco/mnet-db/schema/mnetRemoteRpc";
import { eq } from "@soco/mnet-db";
import { db } from "@soco/mnet-db/client";
import {
  mnetRemoteRpc,
  mnetRemoteRpcIdSchema,
} from "@soco/mnet-db/schema/mnetRemoteRpc";

export const getMnetRemoteRpcs = async () => {
  const rows = await db.select().from(mnetRemoteRpc);
  const m = rows;
  return { mnetRemoteRpc: m };
};

export const getMnetRemoteRpcById = async (id: MnetRemoteRpcId) => {
  const { id: mnetRemoteRpcId } = mnetRemoteRpcIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(mnetRemoteRpc)
    .where(eq(mnetRemoteRpc.id, mnetRemoteRpcId));
  if (row === undefined) return {};
  const m = row;
  return { mnetRemoteRpc: m };
};
