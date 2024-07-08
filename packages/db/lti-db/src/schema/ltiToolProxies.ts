import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const ltiToolProxies = pgTable("lti_tool_proxies", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  capabilityOffered: text("capability_offered"),
  createdBy: varchar("created_by", { length: 256 }),
  guId: varchar("gu_id", { length: 256 }),
  name: varchar("name", { length: 256 }),
  regUrl: text("reg_url"),
  secret: varchar("secret", { length: 256 }),
  serviceOffered: text("service_offered"),
  state: integer("state"),
  toolProxy: text("tool_proxy"),
  vendorCode: varchar("vendor_code", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for ltiToolProxies - used to validate API requests
const baseSchema = createSelectSchema(ltiToolProxies).omit(timestamps);

export const insertLtiToolProxySchema =
  createInsertSchema(ltiToolProxies).omit(timestamps);
export const insertLtiToolProxyParams = baseSchema
  .extend({
    state: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateLtiToolProxySchema = baseSchema;
export const updateLtiToolProxyParams = baseSchema.extend({
  state: z.coerce.number(),
});
export const ltiToolProxyIdSchema = baseSchema.pick({ id: true });

// Types for ltiToolProxies - used to type API request params and within Components
export type LtiToolProxy = typeof ltiToolProxies.$inferSelect;
export type NewLtiToolProxy = z.infer<typeof insertLtiToolProxySchema>;
export type NewLtiToolProxyParams = z.infer<typeof insertLtiToolProxyParams>;
export type UpdateLtiToolProxyParams = z.infer<typeof updateLtiToolProxyParams>;
export type LtiToolProxyId = z.infer<typeof ltiToolProxyIdSchema>["id"];


