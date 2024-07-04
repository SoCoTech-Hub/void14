import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getUserPasswordHistories } from "../api/userPasswordHistories/queries";

export const userPasswordHistories = pgTable("user_password_histories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  hash: varchar("hash", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for userPasswordHistories - used to validate API requests
const baseSchema = createSelectSchema(userPasswordHistories).omit(timestamps);

export const insertUserPasswordHistorySchema = createInsertSchema(
  userPasswordHistories,
).omit(timestamps);
export const insertUserPasswordHistoryParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateUserPasswordHistorySchema = baseSchema;
export const updateUserPasswordHistoryParams = baseSchema.extend({}).omit({
  userId: true,
});
export const userPasswordHistoryIdSchema = baseSchema.pick({ id: true });

// Types for userPasswordHistories - used to type API request params and within Components
export type UserPasswordHistory = typeof userPasswordHistories.$inferSelect;
export type NewUserPasswordHistory = z.infer<
  typeof insertUserPasswordHistorySchema
>;
export type NewUserPasswordHistoryParams = z.infer<
  typeof insertUserPasswordHistoryParams
>;
export type UpdateUserPasswordHistoryParams = z.infer<
  typeof updateUserPasswordHistoryParams
>;
export type UserPasswordHistoryId = z.infer<
  typeof userPasswordHistoryIdSchema
>["id"];

// this type infers the return from getUserPasswordHistories() - meaning it will include any joins
export type CompleteUserPasswordHistory = Awaited<
  ReturnType<typeof getUserPasswordHistories>
>["userPasswordHistories"][number];
