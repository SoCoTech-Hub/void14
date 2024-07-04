import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getFilterConfigs } from "../../api/filterConfigs/queries";

export const filterConfigs = pgTable("filter_configs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  filter: varchar("filter", { length: 256 }),
  name: varchar("name", { length: 256 }),
  value: text("value"),
});

// Schema for filterConfigs - used to validate API requests
const baseSchema = createSelectSchema(filterConfigs);

export const insertFilterConfigSchema = createInsertSchema(filterConfigs);
export const insertFilterConfigParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateFilterConfigSchema = baseSchema;
export const updateFilterConfigParams = baseSchema.extend({});
export const filterConfigIdSchema = baseSchema.pick({ id: true });

// Types for filterConfigs - used to type API request params and within Components
export type FilterConfig = typeof filterConfigs.$inferSelect;
export type NewFilterConfig = z.infer<typeof insertFilterConfigSchema>;
export type NewFilterConfigParams = z.infer<typeof insertFilterConfigParams>;
export type UpdateFilterConfigParams = z.infer<typeof updateFilterConfigParams>;
export type FilterConfigId = z.infer<typeof filterConfigIdSchema>["id"];

// this type infers the return from getFilterConfigs() - meaning it will include any joins
export type CompleteFilterConfig = Awaited<
  ReturnType<typeof getFilterConfigs>
>["filterConfigs"][number];
