import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getLtiTypes } from "../../api/ltiTypes/queries";

export const ltiTypes = pgTable("lti_types", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  baseUrl: text("base_url"),
  clientId: varchar("client_id", { length: 256 }),
  course: varchar("course", { length: 256 }),
  courseVisible: boolean("course_visible"),
  createdBy: varchar("created_by", { length: 256 }),
  description: text("description"),
  enabledCapability: text("enabled_capability"),
  icon: text("icon"),
  ltiVersion: varchar("lti_version", { length: 256 }),
  name: varchar("name", { length: 256 }),
  parameter: text("parameter"),
  secureIcon: text("secure_icon"),
  state: integer("state"),
  toolDomain: varchar("tool_domain", { length: 256 }),
  toolProxyId: varchar("tool_proxy_id", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for ltiTypes - used to validate API requests
const baseSchema = createSelectSchema(ltiTypes).omit(timestamps);

export const insertLtiTypeSchema =
  createInsertSchema(ltiTypes).omit(timestamps);
export const insertLtiTypeParams = baseSchema
  .extend({
    courseVisible: z.coerce.boolean(),
    state: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateLtiTypeSchema = baseSchema;
export const updateLtiTypeParams = baseSchema.extend({
  courseVisible: z.coerce.boolean(),
  state: z.coerce.number(),
});
export const ltiTypeIdSchema = baseSchema.pick({ id: true });

// Types for ltiTypes - used to type API request params and within Components
export type LtiType = typeof ltiTypes.$inferSelect;
export type NewLtiType = z.infer<typeof insertLtiTypeSchema>;
export type NewLtiTypeParams = z.infer<typeof insertLtiTypeParams>;
export type UpdateLtiTypeParams = z.infer<typeof updateLtiTypeParams>;
export type LtiTypeId = z.infer<typeof ltiTypeIdSchema>["id"];

// this type infers the return from getLtiTypes() - meaning it will include any joins
export type CompleteLtiType = Awaited<
  ReturnType<typeof getLtiTypes>
>["ltiTypes"][number];
