import { type getMessagePopups } from "@/lib/api/messagePopups/queries";
import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { messages } from "./messages";

export const messagePopups = pgTable("message_popups", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  isRead: boolean("is_read"),
  messageId: varchar("message_id", { length: 256 })
    .references(() => messages.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for messagePopups - used to validate API requests
const baseSchema = createSelectSchema(messagePopups);

export const insertMessagePopupSchema = createInsertSchema(messagePopups);
export const insertMessagePopupParams = baseSchema
  .extend({
    isRead: z.coerce.boolean(),
    messageId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateMessagePopupSchema = baseSchema;
export const updateMessagePopupParams = baseSchema.extend({
  isRead: z.coerce.boolean(),
  messageId: z.coerce.string().min(1),
});
export const messagePopupIdSchema = baseSchema.pick({ id: true });

// Types for messagePopups - used to type API request params and within Components
export type MessagePopup = typeof messagePopups.$inferSelect;
export type NewMessagePopup = z.infer<typeof insertMessagePopupSchema>;
export type NewMessagePopupParams = z.infer<typeof insertMessagePopupParams>;
export type UpdateMessagePopupParams = z.infer<typeof updateMessagePopupParams>;
export type MessagePopupId = z.infer<typeof messagePopupIdSchema>["id"];

// this type infers the return from getMessagePopups() - meaning it will include any joins
export type CompleteMessagePopup = Awaited<
  ReturnType<typeof getMessagePopups>
>["messagePopups"][number];
