import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getNotifications } from "../api/notifications/queries";

export const notifications = pgTable(
  "notifications",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    component: varchar("component", { length: 256 }),
    contextUrl: text("context_url"),
    contextUrlName: text("context_url_name"),
    customData: text("custom_data"),
    eventType: varchar("event_type", { length: 256 }),
    fullMessage: text("full_message"),
    fullMessageFormat: integer("full_message_format"),
    fullMessageHtml: text("full_message_html"),
    smallMessage: text("small_message"),
    subject: varchar("subject", { length: 256 }),
    timeRead: timestamp("time_read"),
    userIdTo: varchar("user_id_to", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (notifications) => {
    return {
      userIdToIndex: uniqueIndex("user_id_to_idx").on(notifications.userIdTo),
    };
  },
);

// Schema for notifications - used to validate API requests
const baseSchema = createSelectSchema(notifications).omit(timestamps);

export const insertNotificationSchema =
  createInsertSchema(notifications).omit(timestamps);
export const insertNotificationParams = baseSchema
  .extend({
    fullMessageFormat: z.coerce.number(),
    timeRead: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateNotificationSchema = baseSchema;
export const updateNotificationParams = baseSchema
  .extend({
    fullMessageFormat: z.coerce.number(),
    timeRead: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const notificationIdSchema = baseSchema.pick({ id: true });

// Types for notifications - used to type API request params and within Components
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = z.infer<typeof insertNotificationSchema>;
export type NewNotificationParams = z.infer<typeof insertNotificationParams>;
export type UpdateNotificationParams = z.infer<typeof updateNotificationParams>;
export type NotificationId = z.infer<typeof notificationIdSchema>["id"];

// this type infers the return from getNotifications() - meaning it will include any joins
export type CompleteNotification = Awaited<
  ReturnType<typeof getNotifications>
>["notifications"][number];
