import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getConfigs } from "../api/configs/queries";

export const configs = pgTable("configs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  value: text("value"),
});

// Schema for configs - used to validate API requests
const baseSchema = createSelectSchema(configs);

export const insertConfigSchema = createInsertSchema(configs);
export const insertConfigParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateConfigSchema = baseSchema;
export const updateConfigParams = baseSchema.extend({});
export const configIdSchema = baseSchema.pick({ id: true });

// Types for configs - used to type API request params and within Components
export type Config = typeof configs.$inferSelect;
export type NewConfig = z.infer<typeof insertConfigSchema>;
export type NewConfigParams = z.infer<typeof insertConfigParams>;
export type UpdateConfigParams = z.infer<typeof updateConfigParams>;
export type ConfigId = z.infer<typeof configIdSchema>["id"];

// this type infers the return from getConfigs() - meaning it will include any joins
export type CompleteConfig = Awaited<
  ReturnType<typeof getConfigs>
>["configs"][number];
