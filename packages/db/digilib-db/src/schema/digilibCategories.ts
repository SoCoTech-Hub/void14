import { type getDigilibCategories } from "@/lib/api/digilibCategories/queries";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const digilibCategories = pgTable("digilib_categories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  description: text("description"),
  backgroundColor: varchar("background_color", { length: 256 }),
  background: varchar("background", { length: 256 }),
});

// Schema for digilibCategories - used to validate API requests
const baseSchema = createSelectSchema(digilibCategories);

export const insertDigilibCategorySchema =
  createInsertSchema(digilibCategories);
export const insertDigilibCategoryParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateDigilibCategorySchema = baseSchema;
export const updateDigilibCategoryParams = baseSchema.extend({});
export const digilibCategoryIdSchema = baseSchema.pick({ id: true });

// Types for digilibCategories - used to type API request params and within Components
export type DigilibCategory = typeof digilibCategories.$inferSelect;
export type NewDigilibCategory = z.infer<typeof insertDigilibCategorySchema>;
export type NewDigilibCategoryParams = z.infer<
  typeof insertDigilibCategoryParams
>;
export type UpdateDigilibCategoryParams = z.infer<
  typeof updateDigilibCategoryParams
>;
export type DigilibCategoryId = z.infer<typeof digilibCategoryIdSchema>["id"];

// this type infers the return from getDigilibCategories() - meaning it will include any joins
export type CompleteDigilibCategory = Awaited<
  ReturnType<typeof getDigilibCategories>
>["digilibCategories"][number];
