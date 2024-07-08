import { type getUserPasswordResets } from "@/lib/api/userPasswordResets/queries";
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const userPasswordResets = pgTable("user_password_resets", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  token: varchar("token", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for userPasswordResets - used to validate API requests
const baseSchema = createSelectSchema(userPasswordResets).omit(timestamps);

export const insertUserPasswordResetSchema =
  createInsertSchema(userPasswordResets).omit(timestamps);
export const insertUserPasswordResetParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateUserPasswordResetSchema = baseSchema;
export const updateUserPasswordResetParams = baseSchema.extend({}).omit({
  userId: true,
});
export const userPasswordResetIdSchema = baseSchema.pick({ id: true });

// Types for userPasswordResets - used to type API request params and within Components
export type UserPasswordReset = typeof userPasswordResets.$inferSelect;
export type NewUserPasswordReset = z.infer<
  typeof insertUserPasswordResetSchema
>;
export type NewUserPasswordResetParams = z.infer<
  typeof insertUserPasswordResetParams
>;
export type UpdateUserPasswordResetParams = z.infer<
  typeof updateUserPasswordResetParams
>;
export type UserPasswordResetId = z.infer<
  typeof userPasswordResetIdSchema
>["id"];

// this type infers the return from getUserPasswordResets() - meaning it will include any joins
export type CompleteUserPasswordReset = Awaited<
  ReturnType<typeof getUserPasswordResets>
>["userPasswordResets"][number];
