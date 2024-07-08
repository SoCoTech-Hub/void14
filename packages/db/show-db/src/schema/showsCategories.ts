import { type getShowsCategories } from "@/lib/api/showsCategories/queries";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const showsCategories = pgTable("shows_categories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  description: text("description"),
});

// Schema for showsCategories - used to validate API requests
const baseSchema = createSelectSchema(showsCategories);

export const insertShowsCategorySchema = createInsertSchema(showsCategories);
export const insertShowsCategoryParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateShowsCategorySchema = baseSchema;
export const updateShowsCategoryParams = baseSchema.extend({});
export const showsCategoryIdSchema = baseSchema.pick({ id: true });

// Types for showsCategories - used to type API request params and within Components
export type ShowsCategory = typeof showsCategories.$inferSelect;
export type NewShowsCategory = z.infer<typeof insertShowsCategorySchema>;
export type NewShowsCategoryParams = z.infer<typeof insertShowsCategoryParams>;
export type UpdateShowsCategoryParams = z.infer<
  typeof updateShowsCategoryParams
>;
export type ShowsCategoryId = z.infer<typeof showsCategoryIdSchema>["id"];

// this type infers the return from getShowsCategories() - meaning it will include any joins
export type CompleteShowsCategory = Awaited<
  ReturnType<typeof getShowsCategories>
>["showsCategories"][number];
