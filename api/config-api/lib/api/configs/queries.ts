import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ConfigId, configIdSchema, configs } from "@/lib/db/schema/configs";

export const getConfigs = async () => {
  const rows = await db.select().from(configs);
  const c = rows
  return { configs: c };
};

export const getConfigById = async (id: ConfigId) => {
  const { id: configId } = configIdSchema.parse({ id });
  const [row] = await db.select().from(configs).where(eq(configs.id, configId));
  if (row === undefined) return {};
  const c = row;
  return { config: c };
};


