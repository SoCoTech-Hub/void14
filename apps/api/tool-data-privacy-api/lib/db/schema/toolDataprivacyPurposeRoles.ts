import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getToolDataprivacyPurposeRoles } from "../api/toolDataprivacyPurposeRoles/queries";
import { toolDataprivacyPurposes } from "./toolDataprivacyPurposes";

export const toolDataprivacyPurposeRoles = pgTable(
  "tool_dataprivacy_purpose_roles",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    lawfulBases: text("lawful_bases"),
    protected: boolean("protected"),
    toolDataprivacyPurposeId: varchar("tool_dataprivacy_purpose_id", {
      length: 256,
    })
      .references(() => toolDataprivacyPurposes.id)
      .notNull(),
    retentionPeriod: varchar("retention_period", { length: 256 }),
    roleId: varchar("role_id", { length: 256 }),
    sensitiveDataReasons: text("sensitive_data_reasons"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for toolDataprivacyPurposeRoles - used to validate API requests
const baseSchema = createSelectSchema(toolDataprivacyPurposeRoles).omit(
  timestamps,
);

export const insertToolDataprivacyPurposeRoleSchema = createInsertSchema(
  toolDataprivacyPurposeRoles,
).omit(timestamps);
export const insertToolDataprivacyPurposeRoleParams = baseSchema
  .extend({
    protected: z.coerce.boolean(),
    toolDataprivacyPurposeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolDataprivacyPurposeRoleSchema = baseSchema;
export const updateToolDataprivacyPurposeRoleParams = baseSchema
  .extend({
    protected: z.coerce.boolean(),
    toolDataprivacyPurposeId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const toolDataprivacyPurposeRoleIdSchema = baseSchema.pick({ id: true });

// Types for toolDataprivacyPurposeRoles - used to type API request params and within Components
export type ToolDataprivacyPurposeRole =
  typeof toolDataprivacyPurposeRoles.$inferSelect;
export type NewToolDataprivacyPurposeRole = z.infer<
  typeof insertToolDataprivacyPurposeRoleSchema
>;
export type NewToolDataprivacyPurposeRoleParams = z.infer<
  typeof insertToolDataprivacyPurposeRoleParams
>;
export type UpdateToolDataprivacyPurposeRoleParams = z.infer<
  typeof updateToolDataprivacyPurposeRoleParams
>;
export type ToolDataprivacyPurposeRoleId = z.infer<
  typeof toolDataprivacyPurposeRoleIdSchema
>["id"];

// this type infers the return from getToolDataprivacyPurposeRoles() - meaning it will include any joins
export type CompleteToolDataprivacyPurposeRole = Awaited<
  ReturnType<typeof getToolDataprivacyPurposeRoles>
>["toolDataprivacyPurposeRoles"][number];
