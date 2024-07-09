import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const messageUsersBlockeds = pgTable("message_users_blockeds", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  blockedUserId: varchar("blocked_user_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for messageUsersBlockeds - used to validate API requests
const baseSchema = createSelectSchema(messageUsersBlockeds).omit(timestamps);

export const insertMessageUsersBlockedSchema =
  createInsertSchema(messageUsersBlockeds).omit(timestamps);
export const insertMessageUsersBlockedParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateMessageUsersBlockedSchema = baseSchema;
export const updateMessageUsersBlockedParams = baseSchema.extend({}).omit({
  userId: true,
});
export const messageUsersBlockedIdSchema = baseSchema.pick({ id: true });

// Types for messageUsersBlockeds - used to type API request params and within Components
export type MessageUsersBlocked = typeof messageUsersBlockeds.$inferSelect;
export type NewMessageUsersBlocked = z.infer<
  typeof insertMessageUsersBlockedSchema
>;
export type NewMessageUsersBlockedParams = z.infer<
  typeof insertMessageUsersBlockedParams
>;
export type UpdateMessageUsersBlockedParams = z.infer<
  typeof updateMessageUsersBlockedParams
>;
export type MessageUsersBlockedId = z.infer<
  typeof messageUsersBlockedIdSchema
>["id"];

