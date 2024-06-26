import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type LtiTypesConfigId, ltiTypesConfigIdSchema, ltiTypesConfigs } from "@/lib/db/schema/ltiTypesConfigs";

export const getLtiTypesConfigs = async () => {
  const rows = await db.select().from(ltiTypesConfigs);
  const l = rows
  return { ltiTypesConfigs: l };
};

export const getLtiTypesConfigById = async (id: LtiTypesConfigId) => {
  const { id: ltiTypesConfigId } = ltiTypesConfigIdSchema.parse({ id });
  const [row] = await db.select().from(ltiTypesConfigs).where(eq(ltiTypesConfigs.id, ltiTypesConfigId));
  if (row === undefined) return {};
  const l = row;
  return { ltiTypesConfig: l };
};


