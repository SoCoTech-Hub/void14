import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getBlockRecentlyAccessedItems } from "../../api/blockRecentlyAccessedItems/queries";

export const blockRecentlyAccessedItems = pgTable(
  "block_recently_accessed_items",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    cmId: varchar("cm_id", { length: 256 }),
    courseId: varchar("course_id", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (blockRecentlyAccessedItems) => {
    return {
      courseIdIndex: uniqueIndex("brai_course_id_idx").on(
        blockRecentlyAccessedItems.courseId,
      ),
    };
  },
);

// Schema for blockRecentlyAccessedItems - used to validate API requests
const baseSchema = createSelectSchema(blockRecentlyAccessedItems).omit(
  timestamps,
);

export const insertBlockRecentlyAccessedItemSchema = createInsertSchema(
  blockRecentlyAccessedItems,
).omit(timestamps);
export const insertBlockRecentlyAccessedItemParams = baseSchema
  .extend({})
  .omit({
    id: true,
    userId: true,
  });

export const updateBlockRecentlyAccessedItemSchema = baseSchema;
export const updateBlockRecentlyAccessedItemParams = baseSchema
  .extend({})
  .omit({
    userId: true,
  });
export const blockRecentlyAccessedItemIdSchema = baseSchema.pick({ id: true });

// Types for blockRecentlyAccessedItems - used to type API request params and within Components
export type BlockRecentlyAccessedItem =
  typeof blockRecentlyAccessedItems.$inferSelect;
export type NewBlockRecentlyAccessedItem = z.infer<
  typeof insertBlockRecentlyAccessedItemSchema
>;
export type NewBlockRecentlyAccessedItemParams = z.infer<
  typeof insertBlockRecentlyAccessedItemParams
>;
export type UpdateBlockRecentlyAccessedItemParams = z.infer<
  typeof updateBlockRecentlyAccessedItemParams
>;
export type BlockRecentlyAccessedItemId = z.infer<
  typeof blockRecentlyAccessedItemIdSchema
>["id"];

// this type infers the return from getBlockRecentlyAccessedItems() - meaning it will include any joins
export type CompleteBlockRecentlyAccessedItem = Awaited<
  ReturnType<typeof getBlockRecentlyAccessedItems>
>["blockRecentlyAccessedItems"][number];
