import { type getBursaryCategories } from "@/lib/api/bursaryCategories/queries";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const bursaryCategories = pgTable("bursary_categories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  color: varchar("color", { length: 256 }),
  description: text("description"),
});

// Schema for bursaryCategories - used to validate API requests
const baseSchema = createSelectSchema(bursaryCategories);

export const insertBursaryCategorySchema =
  createInsertSchema(bursaryCategories);
export const insertBursaryCategoryParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateBursaryCategorySchema = baseSchema;
export const updateBursaryCategoryParams = baseSchema.extend({});
export const bursaryCategoryIdSchema = baseSchema.pick({ id: true });

// Types for bursaryCategories - used to type API request params and within Components
export type BursaryCategory = typeof bursaryCategories.$inferSelect;
export type NewBursaryCategory = z.infer<typeof insertBursaryCategorySchema>;
export type NewBursaryCategoryParams = z.infer<
  typeof insertBursaryCategoryParams
>;
export type UpdateBursaryCategoryParams = z.infer<
  typeof updateBursaryCategoryParams
>;
export type BursaryCategoryId = z.infer<typeof bursaryCategoryIdSchema>["id"];

// this type infers the return from getBursaryCategories() - meaning it will include any joins
export type CompleteBursaryCategory = Awaited<
  ReturnType<typeof getBursaryCategories>
>["bursaryCategories"][number];
