import { db } from "@soco/config-db/client";
import { eq } from "@soco/config-db";
import { type ConfigPluginId, configPluginIdSchema, configPlugins } from "@soco/config-db/schema/configPlugins";

export const getConfigPlugins = async () => {
  const rows = await db.select().from(configPlugins);
  const c = rows
  return { configPlugins: c };
};

export const getConfigPluginById = async (id: ConfigPluginId) => {
  const { id: configPluginId } = configPluginIdSchema.parse({ id });
  const [row] = await db.select().from(configPlugins).where(eq(configPlugins.id, configPluginId));
  if (row === undefined) return {};
  const c = row;
  return { configPlugin: c };
};


