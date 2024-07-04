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

import { type getToolDataprivacyPurposes } from "../api/toolDataprivacyPurposes/queries";

export const toolDataprivacyPurposes = pgTable("tool_dataprivacy_purposes", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  lawfulBases: text("lawful_bases"),
  name: varchar("name", { length: 256 }),
  protected: boolean("protected"),
  retentionPeriod: varchar("retention_period", { length: 256 }),
  sensitiveDataReasons: text("sensitive_data_reasons"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolDataprivacyPurposes - used to validate API requests
const baseSchema = createSelectSchema(toolDataprivacyPurposes).omit(timestamps);

export const insertToolDataprivacyPurposeSchema = createInsertSchema(
  toolDataprivacyPurposes,
).omit(timestamps);
export const insertToolDataprivacyPurposeParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    protected: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolDataprivacyPurposeSchema = baseSchema;
export const updateToolDataprivacyPurposeParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    protected: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const toolDataprivacyPurposeIdSchema = baseSchema.pick({ id: true });

// Types for toolDataprivacyPurposes - used to type API request params and within Components
export type ToolDataprivacyPurpose =
  typeof toolDataprivacyPurposes.$inferSelect;
export type NewToolDataprivacyPurpose = z.infer<
  typeof insertToolDataprivacyPurposeSchema
>;
export type NewToolDataprivacyPurposeParams = z.infer<
  typeof insertToolDataprivacyPurposeParams
>;
export type UpdateToolDataprivacyPurposeParams = z.infer<
  typeof updateToolDataprivacyPurposeParams
>;
export type ToolDataprivacyPurposeId = z.infer<
  typeof toolDataprivacyPurposeIdSchema
>["id"];

// this type infers the return from getToolDataprivacyPurposes() - meaning it will include any joins
export type CompleteToolDataprivacyPurpose = Awaited<
  ReturnType<typeof getToolDataprivacyPurposes>
>["toolDataprivacyPurposes"][number];
