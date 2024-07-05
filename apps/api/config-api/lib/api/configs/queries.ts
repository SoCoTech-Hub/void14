import { eq } from "drizzle-orm";

import type { ConfigId } from "../../db/schema/configs";
import { db } from "../../db/index";
import { configIdSchema, configs } from "../../db/schema/configs";

export const getConfigs = async () => {
  const rows = await db.select().from(configs);
  const c = rows;
  return { configs: c };
};

export const getConfigById = async (id: ConfigId) => {
  const { id: configId } = configIdSchema.parse({ id });
  const [row] = await db.select().from(configs).where(eq(configs.id, configId));
  if (row === undefined) return {};
  const c = row;
  return { config: c };
};
