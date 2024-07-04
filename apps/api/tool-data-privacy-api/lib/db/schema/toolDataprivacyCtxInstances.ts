import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getToolDataprivacyCtxInstances } from "../../api/toolDataprivacyCtxInstances/queries";
import { toolDataprivacyCategories } from "./toolDataprivacyCategories";
import { toolDataprivacyPurposes } from "./toolDataprivacyPurposes";

export const toolDataprivacyCtxInstances = pgTable(
  "tool_dataprivacy_ctx_instances",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    toolDataprivacyCategoryId: varchar("tool_dataprivacy_category_id", {
      length: 256,
    })
      .references(() => toolDataprivacyCategories.id)
      .notNull(),
    contextId: varchar("context_id", { length: 256 }),
    purposeId: varchar("tool_dataprivacy_purpose_id", { length: 256 })
      .references(() => toolDataprivacyPurposes.id)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for toolDataprivacyCtxInstances - used to validate API requests
const baseSchema = createSelectSchema(toolDataprivacyCtxInstances).omit(
  timestamps,
);

export const insertToolDataprivacyCtxInstanceSchema = createInsertSchema(
  toolDataprivacyCtxInstances,
).omit(timestamps);
export const insertToolDataprivacyCtxInstanceParams = baseSchema
  .extend({
    toolDataprivacyCategoryId: z.coerce.string().min(1),
    toolDataprivacyPurposeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolDataprivacyCtxInstanceSchema = baseSchema;
export const updateToolDataprivacyCtxInstanceParams = baseSchema
  .extend({
    toolDataprivacyCategoryId: z.coerce.string().min(1),
    toolDataprivacyPurposeId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const toolDataprivacyCtxInstanceIdSchema = baseSchema.pick({ id: true });

// Types for toolDataprivacyCtxInstances - used to type API request params and within Components
export type ToolDataprivacyCtxInstance =
  typeof toolDataprivacyCtxInstances.$inferSelect;
export type NewToolDataprivacyCtxInstance = z.infer<
  typeof insertToolDataprivacyCtxInstanceSchema
>;
export type NewToolDataprivacyCtxInstanceParams = z.infer<
  typeof insertToolDataprivacyCtxInstanceParams
>;
export type UpdateToolDataprivacyCtxInstanceParams = z.infer<
  typeof updateToolDataprivacyCtxInstanceParams
>;
export type ToolDataprivacyCtxInstanceId = z.infer<
  typeof toolDataprivacyCtxInstanceIdSchema
>["id"];

// this type infers the return from getToolDataprivacyCtxInstances() - meaning it will include any joins
export type CompleteToolDataprivacyCtxInstance = Awaited<
  ReturnType<typeof getToolDataprivacyCtxInstances>
>["toolDataprivacyCtxInstances"][number];
