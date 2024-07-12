import type { MnetSsoAccessControlId } from "@soco/mnet-db/schema/mnetSsoAccessControls";
import { eq } from "@soco/mnet-db";
import { db } from "@soco/mnet-db/client";
import { mnetHosts } from "@soco/mnet-db/schema/mnetHosts";
import {
  mnetSsoAccessControlIdSchema,
  mnetSsoAccessControls,
} from "@soco/mnet-db/schema/mnetSsoAccessControls";

export const getMnetSsoAccessControls = async () => {
  const rows = await db
    .select({
      mnetSsoAccessControl: mnetSsoAccessControls,
      mnetHost: mnetHosts,
    })
    .from(mnetSsoAccessControls)
    .leftJoin(mnetHosts, eq(mnetSsoAccessControls.mnetHostId, mnetHosts.id));
  const m = rows.map((r) => ({
    ...r.mnetSsoAccessControl,
    mnetHost: r.mnetHost,
  }));
  return { mnetSsoAccessControls: m };
};

export const getMnetSsoAccessControlById = async (
  id: MnetSsoAccessControlId,
) => {
  const { id: mnetSsoAccessControlId } = mnetSsoAccessControlIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      mnetSsoAccessControl: mnetSsoAccessControls,
      mnetHost: mnetHosts,
    })
    .from(mnetSsoAccessControls)
    .where(eq(mnetSsoAccessControls.id, mnetSsoAccessControlId))
    .leftJoin(mnetHosts, eq(mnetSsoAccessControls.mnetHostId, mnetHosts.id));
  if (row === undefined) return {};
  const m = { ...row.mnetSsoAccessControl, mnetHost: row.mnetHost };
  return { mnetSsoAccessControl: m };
};
