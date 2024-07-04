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

import { type getBlockInstances } from "../../api/blockInstances/queries";

export const blockInstances = pgTable("block_instances", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  blockName: varchar("block_name", { length: 256 }),
  configData: text("config_data"),
  defaultRegion: varchar("default_region", { length: 256 }),
  defaultWeight: integer("default_weight"),
  pageTypePattern: varchar("page_type_pattern", { length: 256 }),
  parentContextId: varchar("parent_context_id", { length: 256 }),
  requiredByTheme: boolean("required_by_theme"),
  showInSubContexts: boolean("show_in_sub_contexts"),
  subPagePattern: varchar("sub_page_pattern", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for blockInstances - used to validate API requests
const baseSchema = createSelectSchema(blockInstances).omit(timestamps);

export const insertBlockInstanceSchema =
  createInsertSchema(blockInstances).omit(timestamps);
export const insertBlockInstanceParams = baseSchema
  .extend({
    defaultWeight: z.coerce.number(),
    requiredByTheme: z.coerce.boolean(),
    showInSubContexts: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateBlockInstanceSchema = baseSchema;
export const updateBlockInstanceParams = baseSchema.extend({
  defaultWeight: z.coerce.number(),
  requiredByTheme: z.coerce.boolean(),
  showInSubContexts: z.coerce.boolean(),
});
export const blockInstanceIdSchema = baseSchema.pick({ id: true });

// Types for blockInstances - used to type API request params and within Components
export type BlockInstance = typeof blockInstances.$inferSelect;
export type NewBlockInstance = z.infer<typeof insertBlockInstanceSchema>;
export type NewBlockInstanceParams = z.infer<typeof insertBlockInstanceParams>;
export type UpdateBlockInstanceParams = z.infer<
  typeof updateBlockInstanceParams
>;
export type BlockInstanceId = z.infer<typeof blockInstanceIdSchema>["id"];

// this type infers the return from getBlockInstances() - meaning it will include any joins
export type CompleteBlockInstance = Awaited<
  ReturnType<typeof getBlockInstances>
>["blockInstances"][number];
