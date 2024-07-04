import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getUserInfoFields } from "../api/userInfoFields/queries";

export const userInfoFields = pgTable(
  "user_info_fields",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    categoryId: varchar("category_id", { length: 256 }),
    shortName: varchar("short_name", { length: 256 }),
    name: text("name"),
    dataType: varchar("data_type", { length: 256 }),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    defaultData: text("default_data"),
    defaultDataFormat: integer("default_data_format"),
    param1: text("param1"),
    param2: text("param2"),
    param3: text("param3"),
    param4: text("param4"),
    param5: text("param5"),
    visible: boolean("visible"),
    required: boolean("required"),
    locked: boolean("locked"),
    forceUnique: boolean("force_unique"),
    signup: boolean("signup"),
    sortOrder: integer("sort_order"),
  },
  (userInfoFields) => {
    return {
      categoryIdIndex: uniqueIndex("category_id_idx").on(
        userInfoFields.categoryId,
      ),
    };
  },
);

// Schema for userInfoFields - used to validate API requests
const baseSchema = createSelectSchema(userInfoFields);

export const insertUserInfoFieldSchema = createInsertSchema(userInfoFields);
export const insertUserInfoFieldParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    defaultDataFormat: z.coerce.number(),
    visible: z.coerce.boolean(),
    required: z.coerce.boolean(),
    locked: z.coerce.boolean(),
    forceUnique: z.coerce.boolean(),
    signup: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateUserInfoFieldSchema = baseSchema;
export const updateUserInfoFieldParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  defaultDataFormat: z.coerce.number(),
  visible: z.coerce.boolean(),
  required: z.coerce.boolean(),
  locked: z.coerce.boolean(),
  forceUnique: z.coerce.boolean(),
  signup: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
});
export const userInfoFieldIdSchema = baseSchema.pick({ id: true });

// Types for userInfoFields - used to type API request params and within Components
export type UserInfoField = typeof userInfoFields.$inferSelect;
export type NewUserInfoField = z.infer<typeof insertUserInfoFieldSchema>;
export type NewUserInfoFieldParams = z.infer<typeof insertUserInfoFieldParams>;
export type UpdateUserInfoFieldParams = z.infer<
  typeof updateUserInfoFieldParams
>;
export type UserInfoFieldId = z.infer<typeof userInfoFieldIdSchema>["id"];

// this type infers the return from getUserInfoFields() - meaning it will include any joins
export type CompleteUserInfoField = Awaited<
  ReturnType<typeof getUserInfoFields>
>["userInfoFields"][number];
