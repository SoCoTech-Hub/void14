import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getUserInfoDatas } from "../../api/userInfoDatas/queries";

export const userInfoDatas = pgTable("user_info_datas", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  fieldId: varchar("field_id", { length: 256 }),
  data: text("data"),
  dataFormat: integer("data_format"),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for userInfoDatas - used to validate API requests
const baseSchema = createSelectSchema(userInfoDatas);

export const insertUserInfoDataSchema = createInsertSchema(userInfoDatas);
export const insertUserInfoDataParams = baseSchema
  .extend({
    dataFormat: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateUserInfoDataSchema = baseSchema;
export const updateUserInfoDataParams = baseSchema
  .extend({
    dataFormat: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const userInfoDataIdSchema = baseSchema.pick({ id: true });

// Types for userInfoDatas - used to type API request params and within Components
export type UserInfoData = typeof userInfoDatas.$inferSelect;
export type NewUserInfoData = z.infer<typeof insertUserInfoDataSchema>;
export type NewUserInfoDataParams = z.infer<typeof insertUserInfoDataParams>;
export type UpdateUserInfoDataParams = z.infer<typeof updateUserInfoDataParams>;
export type UserInfoDataId = z.infer<typeof userInfoDataIdSchema>["id"];

// this type infers the return from getUserInfoDatas() - meaning it will include any joins
export type CompleteUserInfoData = Awaited<
  ReturnType<typeof getUserInfoDatas>
>["userInfoDatas"][number];
