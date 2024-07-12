import type {
  ConfigPluginId,
  NewConfigPluginParams,
  UpdateConfigPluginParams,
} from "@soco/config-db/schema/configPlugins";
import { eq } from "@soco/config-db";
import { db } from "@soco/config-db/client";
import {
  configPluginIdSchema,
  configPlugins,
  insertConfigPluginSchema,
  updateConfigPluginSchema,
} from "@soco/config-db/schema/configPlugins";

export const createConfigPlugin = async (
  configPlugin: NewConfigPluginParams,
) => {
  const newConfigPlugin = insertConfigPluginSchema.parse(configPlugin);
  try {
    const [c] = await db
      .insert(configPlugins)
      .values(newConfigPlugin)
      .returning();
    return { configPlugin: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateConfigPlugin = async (
  id: ConfigPluginId,
  configPlugin: UpdateConfigPluginParams,
) => {
  const { id: configPluginId } = configPluginIdSchema.parse({ id });
  const newConfigPlugin = updateConfigPluginSchema.parse(configPlugin);
  try {
    const [c] = await db
      .update(configPlugins)
      .set(newConfigPlugin)
      .where(eq(configPlugins.id, configPluginId!))
      .returning();
    return { configPlugin: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteConfigPlugin = async (id: ConfigPluginId) => {
  const { id: configPluginId } = configPluginIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(configPlugins)
      .where(eq(configPlugins.id, configPluginId!))
      .returning();
    return { configPlugin: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
