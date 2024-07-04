import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getMessageUserActions } from "../../api/messageUserActions/queries";

export const messageUserActions = pgTable("message_user_actions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  action: integer("action"),
  messageId: varchar("message_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for messageUserActions - used to validate API requests
const baseSchema = createSelectSchema(messageUserActions).omit(timestamps);

export const insertMessageUserActionSchema =
  createInsertSchema(messageUserActions).omit(timestamps);
export const insertMessageUserActionParams = baseSchema
  .extend({
    action: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMessageUserActionSchema = baseSchema;
export const updateMessageUserActionParams = baseSchema
  .extend({
    action: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const messageUserActionIdSchema = baseSchema.pick({ id: true });

// Types for messageUserActions - used to type API request params and within Components
export type MessageUserAction = typeof messageUserActions.$inferSelect;
export type NewMessageUserAction = z.infer<
  typeof insertMessageUserActionSchema
>;
export type NewMessageUserActionParams = z.infer<
  typeof insertMessageUserActionParams
>;
export type UpdateMessageUserActionParams = z.infer<
  typeof updateMessageUserActionParams
>;
export type MessageUserActionId = z.infer<
  typeof messageUserActionIdSchema
>["id"];

// this type infers the return from getMessageUserActions() - meaning it will include any joins
export type CompleteMessageUserAction = Awaited<
  ReturnType<typeof getMessageUserActions>
>["messageUserActions"][number];
