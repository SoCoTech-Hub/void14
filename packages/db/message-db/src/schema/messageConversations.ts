import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const messageConversations = pgTable("message_conversations", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  convHash: varchar("conv_hash", { length: 256 }),
  enabled: boolean("enabled"),
  itemId: varchar("item_id", { length: 256 }),
  itemType: varchar("item_type", { length: 256 }),
  name: varchar("name", { length: 256 }),
  type: integer("type"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for messageConversations - used to validate API requests
const baseSchema = createSelectSchema(messageConversations).omit(timestamps);

export const insertMessageConversationSchema =
  createInsertSchema(messageConversations).omit(timestamps);
export const insertMessageConversationParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
    type: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateMessageConversationSchema = baseSchema;
export const updateMessageConversationParams = baseSchema.extend({
  enabled: z.coerce.boolean(),
  type: z.coerce.number(),
});
export const messageConversationIdSchema = baseSchema.pick({ id: true });

// Types for messageConversations - used to type API request params and within Components
export type MessageConversation = typeof messageConversations.$inferSelect;
export type NewMessageConversation = z.infer<
  typeof insertMessageConversationSchema
>;
export type NewMessageConversationParams = z.infer<
  typeof insertMessageConversationParams
>;
export type UpdateMessageConversationParams = z.infer<
  typeof updateMessageConversationParams
>;
export type MessageConversationId = z.infer<
  typeof messageConversationIdSchema
>["id"];
