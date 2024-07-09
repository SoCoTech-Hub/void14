import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const messageContactRequests = pgTable("message_contact_requests", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
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
const baseSchema = createSelectSchema(messageContactRequests).omit(timestamps);

export const insertMessageContactRequestSchema = createInsertSchema(
  messageContactRequests,
).omit(timestamps);
export const insertMessageContactRequestParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateMessageContactRequestSchema = baseSchema;
export const updateMessageContactRequestParams = baseSchema.extend({}).omit({
  userId: true,
});
export const messageContactRequestIdSchema = baseSchema.pick({ id: true });

// Types for messageContactRequests - used to type API request params and within Components
export type MessageContactRequest = typeof messageContactRequests.$inferSelect;
export type NewMessageContactRequest = z.infer<
  typeof insertMessageContactRequestSchema
>;
export type NewMessageContactRequestParams = z.infer<
  typeof insertMessageContactRequestParams
>;
export type UpdateMessageContactRequestParams = z.infer<
  typeof updateMessageContactRequestParams
>;
export type MessageContactRequestId = z.infer<
  typeof messageContactRequestIdSchema
>["id"];

