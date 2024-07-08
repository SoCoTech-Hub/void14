import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const ltiTypesConfigs = pgTable("lti_types_configs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  typeId: varchar("type_id", { length: 256 }),
  value: text("value"),
});

// Schema for ltiTypesConfigs - used to validate API requests
const baseSchema = createSelectSchema(ltiTypesConfigs);

export const insertLtiTypesConfigSchema = createInsertSchema(ltiTypesConfigs);
export const insertLtiTypesConfigParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateLtiTypesConfigSchema = baseSchema;
export const updateLtiTypesConfigParams = baseSchema.extend({});
export const ltiTypesConfigIdSchema = baseSchema.pick({ id: true });

// Types for ltiTypesConfigs - used to type API request params and within Components
export type LtiTypesConfig = typeof ltiTypesConfigs.$inferSelect;
export type NewLtiTypesConfig = z.infer<typeof insertLtiTypesConfigSchema>;
export type NewLtiTypesConfigParams = z.infer<
  typeof insertLtiTypesConfigParams
>;
export type UpdateLtiTypesConfigParams = z.infer<
  typeof updateLtiTypesConfigParams
>;
export type LtiTypesConfigId = z.infer<typeof ltiTypesConfigIdSchema>["id"];


