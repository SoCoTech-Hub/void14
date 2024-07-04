import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getUserInfoCategories } from "../../api/userInfoCategories/queries";

export const userInfoCategories = pgTable("user_info_categories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  sortOrder: integer("sort_order"),
});

// Schema for userInfoCategories - used to validate API requests
const baseSchema = createSelectSchema(userInfoCategories);

export const insertUserInfoCategorySchema =
  createInsertSchema(userInfoCategories);
export const insertUserInfoCategoryParams = baseSchema
  .extend({
    sortOrder0: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateUserInfoCategorySchema = baseSchema;
export const updateUserInfoCategoryParams = baseSchema.extend({
  sortOrder0: z.coerce.number(),
});
export const userInfoCategoryIdSchema = baseSchema.pick({ id: true });

// Types for userInfoCategories - used to type API request params and within Components
export type UserInfoCategory = typeof userInfoCategories.$inferSelect;
export type NewUserInfoCategory = z.infer<typeof insertUserInfoCategorySchema>;
export type NewUserInfoCategoryParams = z.infer<
  typeof insertUserInfoCategoryParams
>;
export type UpdateUserInfoCategoryParams = z.infer<
  typeof updateUserInfoCategoryParams
>;
export type UserInfoCategoryId = z.infer<typeof userInfoCategoryIdSchema>["id"];

// this type infers the return from getUserInfoCategories() - meaning it will include any joins
export type CompleteUserInfoCategory = Awaited<
  ReturnType<typeof getUserInfoCategories>
>["userInfoCategories"][number];
