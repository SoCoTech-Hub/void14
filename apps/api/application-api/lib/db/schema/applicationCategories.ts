import { type getApplicationCategories } from "@/lib/api/applicationCategories/queries";
import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const applicationCategories = pgTable(
  "application_categories",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    icon: varchar("icon", { length: 256 }),
    color: varchar("color", { length: 256 }),
    description: text("description"),
  },
  (applicationCategories) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(applicationCategories.name),
    };
  },
);

// Schema for applicationCategories - used to validate API requests
const baseSchema = createSelectSchema(applicationCategories);

export const insertApplicationCategorySchema = createInsertSchema(
  applicationCategories,
);
export const insertApplicationCategoryParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateApplicationCategorySchema = baseSchema;
export const updateApplicationCategoryParams = baseSchema.extend({});
export const applicationCategoryIdSchema = baseSchema.pick({ id: true });

// Types for applicationCategories - used to type API request params and within Components
export type ApplicationCategory = typeof applicationCategories.$inferSelect;
export type NewApplicationCategory = z.infer<
  typeof insertApplicationCategorySchema
>;
export type NewApplicationCategoryParams = z.infer<
  typeof insertApplicationCategoryParams
>;
export type UpdateApplicationCategoryParams = z.infer<
  typeof updateApplicationCategoryParams
>;
export type ApplicationCategoryId = z.infer<
  typeof applicationCategoryIdSchema
>["id"];

// this type infers the return from getApplicationCategories() - meaning it will include any joins
export type CompleteApplicationCategory = Awaited<
  ReturnType<typeof getApplicationCategories>
>["applicationCategories"][number];
