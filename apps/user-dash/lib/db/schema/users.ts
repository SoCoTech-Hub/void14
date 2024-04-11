import { sql } from "drizzle-orm";
import { varchar, text, timestamp, boolean, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getUsers } from "@/lib/api/users/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const users = pgTable('users', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  userName: varchar("user_name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
  deviceId: text("device_id"),
  expiryDate: timestamp("expiry_date"),
  isConfirmed: boolean("is_confirmed").notNull(),
  isBlocked: boolean("is_blocked").notNull(),
  isLoggedIn: boolean("is_logged_in").notNull(),
  isDeleted: boolean("is_deleted").notNull(),
  isDisabled: boolean("is_disabled").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (users) => {
  return {
    emailIndex: uniqueIndex('email_idx').on(users.email),
  }
});


// Schema for users - used to validate API requests
const baseSchema = createSelectSchema(users).omit(timestamps)

export const insertUserSchema = createInsertSchema(users).omit(timestamps);
export const insertUserParams = baseSchema.extend({
  expiryDate: z.coerce.string().min(1),
  isConfirmed: z.coerce.boolean(),
  isBlocked: z.coerce.boolean(),
  isLoggedIn: z.coerce.boolean(),
  isDeleted: z.coerce.boolean(),
  isDisabled: z.coerce.boolean()
}).omit({ 
  id: true,
  userId: true
});

export const updateUserSchema = baseSchema;
export const updateUserParams = baseSchema.extend({
  expiryDate: z.coerce.string().min(1),
  isConfirmed: z.coerce.boolean(),
  isBlocked: z.coerce.boolean(),
  isLoggedIn: z.coerce.boolean(),
  isDeleted: z.coerce.boolean(),
  isDisabled: z.coerce.boolean()
}).omit({ 
  userId: true
});
export const userIdSchema = baseSchema.pick({ id: true });

// Types for users - used to type API request params and within Components
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type UserId = z.infer<typeof userIdSchema>["id"];
    
// this type infers the return from getUsers() - meaning it will include any joins
export type CompleteUser = Awaited<ReturnType<typeof getUsers>>["users"][number];

