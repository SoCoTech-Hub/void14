import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getMessagePopupNotifications } from "../../api/messagePopupNotifications/queries";

export const messagePopupNotifications = pgTable(
  "message_popup_notifications",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    notificationId: varchar("notification_id", { length: 256 }),
  },
);

// Schema for messagePopupNotifications - used to validate API requests
const baseSchema = createSelectSchema(messagePopupNotifications);

export const insertMessagePopupNotificationSchema = createInsertSchema(
  messagePopupNotifications,
);
export const insertMessagePopupNotificationParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateMessagePopupNotificationSchema = baseSchema;
export const updateMessagePopupNotificationParams = baseSchema.extend({});
export const messagePopupNotificationIdSchema = baseSchema.pick({ id: true });

// Types for messagePopupNotifications - used to type API request params and within Components
export type MessagePopupNotification =
  typeof messagePopupNotifications.$inferSelect;
export type NewMessagePopupNotification = z.infer<
  typeof insertMessagePopupNotificationSchema
>;
export type NewMessagePopupNotificationParams = z.infer<
  typeof insertMessagePopupNotificationParams
>;
export type UpdateMessagePopupNotificationParams = z.infer<
  typeof updateMessagePopupNotificationParams
>;
export type MessagePopupNotificationId = z.infer<
  typeof messagePopupNotificationIdSchema
>["id"];

// this type infers the return from getMessagePopupNotifications() - meaning it will include any joins
export type CompleteMessagePopupNotification = Awaited<
  ReturnType<typeof getMessagePopupNotifications>
>["messagePopupNotifications"][number];
