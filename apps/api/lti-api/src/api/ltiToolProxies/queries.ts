import type { LtiToolProxyId } from "@soco/lti-db/schema/ltiToolProxies";
import { eq } from "@soco/lti-db";
import { db } from "@soco/lti-db/client";
import {
  ltiToolProxies,
  ltiToolProxyIdSchema,
} from "@soco/lti-db/schema/ltiToolProxies";

export const getLtiToolProxies = async () => {
  const rows = await db.select().from(ltiToolProxies);
  const l = rows;
  return { ltiToolProxies: l };
};

export const getLtiToolProxyById = async (id: LtiToolProxyId) => {
  const { id: ltiToolProxyId } = ltiToolProxyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(ltiToolProxies)
    .where(eq(ltiToolProxies.id, ltiToolProxyId));
  if (row === undefined) return {};
  const l = row;
  return { ltiToolProxy: l };
};
