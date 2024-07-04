import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getMessageContacts } from "../../api/messageContacts/queries";

export const messageContacts = pgTable("message_contacts", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contactId: varchar("contact_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for messageContacts - used to validate API requests
const baseSchema = createSelectSchema(messageContacts).omit(timestamps);

export const insertMessageContactSchema =
  createInsertSchema(messageContacts).omit(timestamps);
export const insertMessageContactParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateMessageContactSchema = baseSchema;
export const updateMessageContactParams = baseSchema.extend({}).omit({
  userId: true,
});
export const messageContactIdSchema = baseSchema.pick({ id: true });

// Types for messageContacts - used to type API request params and within Components
export type MessageContact = typeof messageContacts.$inferSelect;
export type NewMessageContact = z.infer<typeof insertMessageContactSchema>;
export type NewMessageContactParams = z.infer<
  typeof insertMessageContactParams
>;
export type UpdateMessageContactParams = z.infer<
  typeof updateMessageContactParams
>;
export type MessageContactId = z.infer<typeof messageContactIdSchema>["id"];

// this type infers the return from getMessageContacts() - meaning it will include any joins
export type CompleteMessageContact = Awaited<
  ReturnType<typeof getMessageContacts>
>["messageContacts"][number];
