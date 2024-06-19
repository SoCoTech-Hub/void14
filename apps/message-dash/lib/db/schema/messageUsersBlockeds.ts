import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMessageUsersBlockeds } from "@/lib/api/messageUsersBlockeds/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const messageUsersBlockeds = pgTable('message_users_blockeds', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
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
const baseSchema = createSelectSchema(messageUsersBlockeds).omit(timestamps)

export const insertMessageUsersBlockedSchema = createInsertSchema(messageUsersBlockeds).omit(timestamps);
export const insertMessageUsersBlockedParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateMessageUsersBlockedSchema = baseSchema;
export const updateMessageUsersBlockedParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const messageUsersBlockedIdSchema = baseSchema.pick({ id: true });

// Types for messageUsersBlockeds - used to type API request params and within Components
export type MessageUsersBlocked = typeof messageUsersBlockeds.$inferSelect;
export type NewMessageUsersBlocked = z.infer<typeof insertMessageUsersBlockedSchema>;
export type NewMessageUsersBlockedParams = z.infer<typeof insertMessageUsersBlockedParams>;
export type UpdateMessageUsersBlockedParams = z.infer<typeof updateMessageUsersBlockedParams>;
export type MessageUsersBlockedId = z.infer<typeof messageUsersBlockedIdSchema>["id"];
    
// this type infers the return from getMessageUsersBlockeds() - meaning it will include any joins
export type CompleteMessageUsersBlocked = Awaited<ReturnType<typeof getMessageUsersBlockeds>>["messageUsersBlockeds"][number];

