import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getEnrolLtiLti2ToolProxys } from "../api/enrolLtiLti2ToolProxys/queries";

export const enrolLtiLti2ToolProxys = pgTable("enrol_lti_lti2_tool_proxys", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  consumerId: varchar("consumer_id", { length: 256 }),
  toolProxy: text("tool_proxy"),
  toolProxyKey: varchar("tool_proxy_key", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiLti2ToolProxys - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiLti2ToolProxys).omit(timestamps);

export const insertEnrolLtiLti2ToolProxySchema = createInsertSchema(
  enrolLtiLti2ToolProxys,
).omit(timestamps);
export const insertEnrolLtiLti2ToolProxyParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateEnrolLtiLti2ToolProxySchema = baseSchema;
export const updateEnrolLtiLti2ToolProxyParams = baseSchema.extend({});
export const enrolLtiLti2ToolProxyIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiLti2ToolProxys - used to type API request params and within Components
export type EnrolLtiLti2ToolProxy = typeof enrolLtiLti2ToolProxys.$inferSelect;
export type NewEnrolLtiLti2ToolProxy = z.infer<
  typeof insertEnrolLtiLti2ToolProxySchema
>;
export type NewEnrolLtiLti2ToolProxyParams = z.infer<
  typeof insertEnrolLtiLti2ToolProxyParams
>;
export type UpdateEnrolLtiLti2ToolProxyParams = z.infer<
  typeof updateEnrolLtiLti2ToolProxyParams
>;
export type EnrolLtiLti2ToolProxyId = z.infer<
  typeof enrolLtiLti2ToolProxyIdSchema
>["id"];

// this type infers the return from getEnrolLtiLti2ToolProxys() - meaning it will include any joins
export type CompleteEnrolLtiLti2ToolProxy = Awaited<
  ReturnType<typeof getEnrolLtiLti2ToolProxys>
>["enrolLtiLti2ToolProxys"][number];
