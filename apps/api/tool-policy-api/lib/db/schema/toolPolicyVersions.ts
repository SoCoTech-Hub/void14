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

import { type getToolPolicyVersions } from "../api/toolPolicyVersions/queries";
import { toolPolicies } from "./toolPolicies";

export const toolPolicyVersions = pgTable("tool_policy_versions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  agreementStyle: integer("agreement_style"),
  archived: integer("archived"),
  audience: integer("audience"),
  content: text("content"),
  contentFormat: integer("content_format"),
  name: varchar("name", { length: 256 }).notNull(),
  optional: integer("optional"),
  toolPolicyId: varchar("tool_policy_id", { length: 256 })
    .references(() => toolPolicies.id, { onDelete: "cascade" })
    .notNull(),
  revision: varchar("revision", { length: 256 }),
  summary: text("summary"),
  summaryFormat: integer("summary_format"),
  type: integer("type"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolPolicyVersions - used to validate API requests
const baseSchema = createSelectSchema(toolPolicyVersions).omit(timestamps);

export const insertToolPolicyVersionSchema =
  createInsertSchema(toolPolicyVersions).omit(timestamps);
export const insertToolPolicyVersionParams = baseSchema
  .extend({
    agreementStyle: z.coerce.number(),
    archived: z.coerce.number(),
    audience: z.coerce.number(),
    contentFormat: z.coerce.number(),
    optional: z.coerce.number(),
    toolPolicyId: z.coerce.string().min(1),
    summaryFormat: z.coerce.number(),
    type: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolPolicyVersionSchema = baseSchema;
export const updateToolPolicyVersionParams = baseSchema
  .extend({
    agreementStyle: z.coerce.number(),
    archived: z.coerce.number(),
    audience: z.coerce.number(),
    contentFormat: z.coerce.number(),
    optional: z.coerce.number(),
    toolPolicyId: z.coerce.string().min(1),
    summaryFormat: z.coerce.number(),
    type: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const toolPolicyVersionIdSchema = baseSchema.pick({ id: true });

// Types for toolPolicyVersions - used to type API request params and within Components
export type ToolPolicyVersion = typeof toolPolicyVersions.$inferSelect;
export type NewToolPolicyVersion = z.infer<
  typeof insertToolPolicyVersionSchema
>;
export type NewToolPolicyVersionParams = z.infer<
  typeof insertToolPolicyVersionParams
>;
export type UpdateToolPolicyVersionParams = z.infer<
  typeof updateToolPolicyVersionParams
>;
export type ToolPolicyVersionId = z.infer<
  typeof toolPolicyVersionIdSchema
>["id"];

// this type infers the return from getToolPolicyVersions() - meaning it will include any joins
export type CompleteToolPolicyVersion = Awaited<
  ReturnType<typeof getToolPolicyVersions>
>["toolPolicyVersions"][number];
