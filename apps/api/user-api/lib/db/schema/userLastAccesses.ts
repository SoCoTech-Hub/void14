import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getUserLastAccesses } from "../api/userLastAccesses/queries";

export const userLastAccesses = pgTable("user_last_accesses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for userLastAccesses - used to validate API requests
const baseSchema = createSelectSchema(userLastAccesses).omit(timestamps);

export const insertUserLastAccessSchema =
  createInsertSchema(userLastAccesses).omit(timestamps);
export const insertUserLastAccessParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateUserLastAccessSchema = baseSchema;
export const updateUserLastAccessParams = baseSchema.extend({}).omit({
  userId: true,
});
export const userLastAccessIdSchema = baseSchema.pick({ id: true });

// Types for userLastAccesses - used to type API request params and within Components
export type UserLastAccess = typeof userLastAccesses.$inferSelect;
export type NewUserLastAccess = z.infer<typeof insertUserLastAccessSchema>;
export type NewUserLastAccessParams = z.infer<
  typeof insertUserLastAccessParams
>;
export type UpdateUserLastAccessParams = z.infer<
  typeof updateUserLastAccessParams
>;
export type UserLastAccessId = z.infer<typeof userLastAccessIdSchema>["id"];

// this type infers the return from getUserLastAccesses() - meaning it will include any joins
export type CompleteUserLastAccess = Awaited<
  ReturnType<typeof getUserLastAccesses>
>["userLastAccesses"][number];
