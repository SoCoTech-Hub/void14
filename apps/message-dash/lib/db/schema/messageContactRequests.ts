import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMessageContactRequests } from "@/lib/api/messageContactRequests/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const messageContactRequests = pgTable('message_contact_requests', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  requestedUserId: varchar("requested_user_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for messageContactRequests - used to validate API requests
const baseSchema = createSelectSchema(messageContactRequests).omit(timestamps)

export const insertMessageContactRequestSchema = createInsertSchema(messageContactRequests).omit(timestamps);
export const insertMessageContactRequestParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateMessageContactRequestSchema = baseSchema;
export const updateMessageContactRequestParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const messageContactRequestIdSchema = baseSchema.pick({ id: true });

// Types for messageContactRequests - used to type API request params and within Components
export type MessageContactRequest = typeof messageContactRequests.$inferSelect;
export type NewMessageContactRequest = z.infer<typeof insertMessageContactRequestSchema>;
export type NewMessageContactRequestParams = z.infer<typeof insertMessageContactRequestParams>;
export type UpdateMessageContactRequestParams = z.infer<typeof updateMessageContactRequestParams>;
export type MessageContactRequestId = z.infer<typeof messageContactRequestIdSchema>["id"];
    
// this type infers the return from getMessageContactRequests() - meaning it will include any joins
export type CompleteMessageContactRequest = Awaited<ReturnType<typeof getMessageContactRequests>>["messageContactRequests"][number];

