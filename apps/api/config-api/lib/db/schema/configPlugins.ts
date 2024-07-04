import { type getConfigPlugins } from "@/lib/api/configPlugins/queries";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const configPlugins = pgTable("config_plugins", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  plugIn: varchar("plug_in", { length: 256 }),
  value: text("value"),
});

// Schema for configPlugins - used to validate API requests
const baseSchema = createSelectSchema(configPlugins);

export const insertConfigPluginSchema = createInsertSchema(configPlugins);
export const insertConfigPluginParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateConfigPluginSchema = baseSchema;
export const updateConfigPluginParams = baseSchema.extend({});
export const configPluginIdSchema = baseSchema.pick({ id: true });

// Types for configPlugins - used to type API request params and within Components
export type ConfigPlugin = typeof configPlugins.$inferSelect;
export type NewConfigPlugin = z.infer<typeof insertConfigPluginSchema>;
export type NewConfigPluginParams = z.infer<typeof insertConfigPluginParams>;
export type UpdateConfigPluginParams = z.infer<typeof updateConfigPluginParams>;
export type ConfigPluginId = z.infer<typeof configPluginIdSchema>["id"];

// this type infers the return from getConfigPlugins() - meaning it will include any joins
export type CompleteConfigPlugin = Awaited<
  ReturnType<typeof getConfigPlugins>
>["configPlugins"][number];
