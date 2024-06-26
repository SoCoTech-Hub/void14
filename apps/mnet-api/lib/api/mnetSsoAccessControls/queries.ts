import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MnetSsoAccessControlId, mnetSsoAccessControlIdSchema, mnetSsoAccessControls } from "@/lib/db/schema/mnetSsoAccessControls";
import { mnetHosts } from "@/lib/db/schema/mnetHosts";

export const getMnetSsoAccessControls = async () => {
  const rows = await db.select({ mnetSsoAccessControl: mnetSsoAccessControls, mnetHost: mnetHosts }).from(mnetSsoAccessControls).leftJoin(mnetHosts, eq(mnetSsoAccessControls.mnetHostId, mnetHosts.id));
  const m = rows .map((r) => ({ ...r.mnetSsoAccessControl, mnetHost: r.mnetHost})); 
  return { mnetSsoAccessControls: m };
};

export const getMnetSsoAccessControlById = async (id: MnetSsoAccessControlId) => {
  const { id: mnetSsoAccessControlId } = mnetSsoAccessControlIdSchema.parse({ id });
  const [row] = await db.select({ mnetSsoAccessControl: mnetSsoAccessControls, mnetHost: mnetHosts }).from(mnetSsoAccessControls).where(eq(mnetSsoAccessControls.id, mnetSsoAccessControlId)).leftJoin(mnetHosts, eq(mnetSsoAccessControls.mnetHostId, mnetHosts.id));
  if (row === undefined) return {};
  const m =  { ...row.mnetSsoAccessControl, mnetHost: row.mnetHost } ;
  return { mnetSsoAccessControl: m };
};


