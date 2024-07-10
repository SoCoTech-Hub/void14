import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const customFieldCategories = pgTable(
  "custom_field_categories",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    area: varchar("area", { length: 256 }),
    component: varchar("component", { length: 256 }),
    contextId: varchar("context_id", { length: 256 }),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    itemId: varchar("item_id", { length: 256 }),
    name: varchar("name", { length: 256 }),
    sortOrder: integer("sort_order"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (customFieldCategories) => {
    return {
      sortOrderIndex: uniqueIndex("sort_order").on(
        customFieldCategories.sortOrder,
      ),
    };
  },
);

// Schema for customFieldCategories - used to validate API requests
const baseSchema = createSelectSchema(customFieldCategories).omit(timestamps);

export const insertCustomFieldCategorySchema = createInsertSchema(
  customFieldCategories,
).omit(timestamps);
export const insertCustomFieldCategoryParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateCustomFieldCategorySchema = baseSchema;
export const updateCustomFieldCategoryParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  sortOrder: z.coerce.number(),
});
export const customFieldCategoryIdSchema = baseSchema.pick({ id: true });

// Types for customFieldCategories - used to type API request params and within Components
export type CustomFieldCategory = typeof customFieldCategories.$inferSelect;
export type NewCustomFieldCategory = z.infer<
  typeof insertCustomFieldCategorySchema
>;
export type NewCustomFieldCategoryParams = z.infer<
  typeof insertCustomFieldCategoryParams
>;
export type UpdateCustomFieldCategoryParams = z.infer<
  typeof updateCustomFieldCategoryParams
>;
export type CustomFieldCategoryId = z.infer<
  typeof customFieldCategoryIdSchema
>["id"];
