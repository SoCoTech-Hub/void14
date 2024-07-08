import { db } from "@soco/enrol-db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiLti2ToolProxyId, enrolLtiLti2ToolProxyIdSchema, enrolLtiLti2ToolProxys } from "@soco/enrol-db/schema/enrolLtiLti2ToolProxys";

export const getEnrolLtiLti2ToolProxys = async () => {
  const rows = await db.select().from(enrolLtiLti2ToolProxys);
  const e = rows
  return { enrolLtiLti2ToolProxys: e };
};

export const getEnrolLtiLti2ToolProxyById = async (id: EnrolLtiLti2ToolProxyId) => {
  const { id: enrolLtiLti2ToolProxyId } = enrolLtiLti2ToolProxyIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiLti2ToolProxys).where(eq(enrolLtiLti2ToolProxys.id, enrolLtiLti2ToolProxyId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2ToolProxy: e };
};


