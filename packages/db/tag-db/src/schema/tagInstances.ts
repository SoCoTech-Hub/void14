import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { tags } from "./tags";

export const tagInstances = pgTable("tag_instances", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  itemId: varchar("item_id", { length: 256 }),
  itemType: varchar("item_type", { length: 256 }),
  ordering: integer("ordering"),
  tagId: varchar("tag_id", { length: 256 })
    .references(() => tags.id)
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for tagInstances - used to validate API requests
const baseSchema = createSelectSchema(tagInstances).omit(timestamps);

export const insertTagInstanceSchema =
  createInsertSchema(tagInstances).omit(timestamps);
export const insertTagInstanceParams = baseSchema
  .extend({
    ordering: z.coerce.number(),
    tagId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateTagInstanceSchema = baseSchema;
export const updateTagInstanceParams = baseSchema
  .extend({
    ordering: z.coerce.number(),
    tagId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const tagInstanceIdSchema = baseSchema.pick({ id: true });

// Types for tagInstances - used to type API request params and within Components
export type TagInstance = typeof tagInstances.$inferSelect;
export type NewTagInstance = z.infer<typeof insertTagInstanceSchema>;
export type NewTagInstanceParams = z.infer<typeof insertTagInstanceParams>;
export type UpdateTagInstanceParams = z.infer<typeof updateTagInstanceParams>;
export type TagInstanceId = z.infer<typeof tagInstanceIdSchema>["id"];

