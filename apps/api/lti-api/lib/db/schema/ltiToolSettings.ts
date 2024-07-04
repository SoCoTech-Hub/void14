import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getLtiToolSettings } from "../api/ltiToolSettings/queries";

export const ltiToolSettings = pgTable("lti_tool_settings", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  course: varchar("course", { length: 256 }),
  courseModuleId: varchar("course_module_id", { length: 256 }),
  settings: text("settings"),
  toolProxyId: varchar("tool_proxy_id", { length: 256 }),
  typeId: varchar("type_id", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for ltiToolSettings - used to validate API requests
const baseSchema = createSelectSchema(ltiToolSettings).omit(timestamps);

export const insertLtiToolSettingSchema =
  createInsertSchema(ltiToolSettings).omit(timestamps);
export const insertLtiToolSettingParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateLtiToolSettingSchema = baseSchema;
export const updateLtiToolSettingParams = baseSchema.extend({});
export const ltiToolSettingIdSchema = baseSchema.pick({ id: true });

// Types for ltiToolSettings - used to type API request params and within Components
export type LtiToolSetting = typeof ltiToolSettings.$inferSelect;
export type NewLtiToolSetting = z.infer<typeof insertLtiToolSettingSchema>;
export type NewLtiToolSettingParams = z.infer<
  typeof insertLtiToolSettingParams
>;
export type UpdateLtiToolSettingParams = z.infer<
  typeof updateLtiToolSettingParams
>;
export type LtiToolSettingId = z.infer<typeof ltiToolSettingIdSchema>["id"];

// this type infers the return from getLtiToolSettings() - meaning it will include any joins
export type CompleteLtiToolSetting = Awaited<
  ReturnType<typeof getLtiToolSettings>
>["ltiToolSettings"][number];
