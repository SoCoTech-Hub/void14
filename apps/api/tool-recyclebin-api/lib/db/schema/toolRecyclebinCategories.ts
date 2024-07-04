import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getToolRecyclebinCategories } from "../api/toolRecyclebinCategories/queries";

export const toolRecyclebinCategories = pgTable(
  "tool_recyclebin_categories",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    categoryId: varchar("category_id", { length: 256 }),
    fullName: varchar("full_name", { length: 256 }),
    shortName: varchar("short_name", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (toolRecyclebinCategories) => {
    return {
      categoryIdIndex: uniqueIndex("category_id_idx").on(
        toolRecyclebinCategories.categoryId,
      ),
    };
  },
);

// Schema for toolRecyclebinCategories - used to validate API requests
const baseSchema = createSelectSchema(toolRecyclebinCategories).omit(
  timestamps,
);

export const insertToolRecyclebinCategorySchema = createInsertSchema(
  toolRecyclebinCategories,
).omit(timestamps);
export const insertToolRecyclebinCategoryParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateToolRecyclebinCategorySchema = baseSchema;
export const updateToolRecyclebinCategoryParams = baseSchema.extend({});
export const toolRecyclebinCategoryIdSchema = baseSchema.pick({ id: true });

// Types for toolRecyclebinCategories - used to type API request params and within Components
export type ToolRecyclebinCategory =
  typeof toolRecyclebinCategories.$inferSelect;
export type NewToolRecyclebinCategory = z.infer<
  typeof insertToolRecyclebinCategorySchema
>;
export type NewToolRecyclebinCategoryParams = z.infer<
  typeof insertToolRecyclebinCategoryParams
>;
export type UpdateToolRecyclebinCategoryParams = z.infer<
  typeof updateToolRecyclebinCategoryParams
>;
export type ToolRecyclebinCategoryId = z.infer<
  typeof toolRecyclebinCategoryIdSchema
>["id"];

// this type infers the return from getToolRecyclebinCategories() - meaning it will include any joins
export type CompleteToolRecyclebinCategory = Awaited<
  ReturnType<typeof getToolRecyclebinCategories>
>["toolRecyclebinCategories"][number];
