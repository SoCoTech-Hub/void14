import { type getCustomFieldFields } from "@/lib/api/customFieldFields/queries";
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

import { nanoid, timestamps } from "@soco/utils";

import { customFieldCategories } from "./customFieldCategories";

export const customFieldFields = pgTable(
  "custom_field_fields",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    customFieldCategoryId: varchar("custom_field_category_id", { length: 256 })
      .references(() => customFieldCategories.id, { onDelete: "cascade" })
      .notNull(),
    configData: text("config_data"),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    name: varchar("name", { length: 256 }),
    shortName: varchar("short_name", { length: 256 }),
    sortOrder: integer("sort_order"),
    type: varchar("type", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (customFieldFields) => {
    return {
      sortOrderIndex: uniqueIndex("custom_field_fields_sort_order_idx").on(
        customFieldFields.sortOrder,
      ),
    };
  },
);

// Schema for customFieldFields - used to validate API requests
const baseSchema = createSelectSchema(customFieldFields).omit(timestamps);

export const insertCustomFieldFieldSchema =
  createInsertSchema(customFieldFields).omit(timestamps);
export const insertCustomFieldFieldParams = baseSchema
  .extend({
    customFieldCategoryId: z.coerce.string().min(1),
    descriptionFormat: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateCustomFieldFieldSchema = baseSchema;
export const updateCustomFieldFieldParams = baseSchema.extend({
  customFieldCategoryId: z.coerce.string().min(1),
  descriptionFormat: z.coerce.number(),
  sortOrder: z.coerce.number(),
});
export const customFieldFieldIdSchema = baseSchema.pick({ id: true });

// Types for customFieldFields - used to type API request params and within Components
export type CustomFieldField = typeof customFieldFields.$inferSelect;
export type NewCustomFieldField = z.infer<typeof insertCustomFieldFieldSchema>;
export type NewCustomFieldFieldParams = z.infer<
  typeof insertCustomFieldFieldParams
>;
export type UpdateCustomFieldFieldParams = z.infer<
  typeof updateCustomFieldFieldParams
>;
export type CustomFieldFieldId = z.infer<typeof customFieldFieldIdSchema>["id"];

// this type infers the return from getCustomFieldFields() - meaning it will include any joins
export type CompleteCustomFieldField = Awaited<
  ReturnType<typeof getCustomFieldFields>
>["customFieldFields"][number];
