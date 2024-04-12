import { varchar, text, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getNotifications } from "@/lib/api/notifications/queries";

import { nanoid } from "@/lib/utils";


export const notifications = pgTable('notifications', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  body: text("body"),
  type: varchar("type", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull()
});


// Schema for notifications - used to validate API requests
const baseSchema = createSelectSchema(notifications)

export const insertNotificationSchema = createInsertSchema(notifications);
export const insertNotificationParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateNotificationSchema = baseSchema;
export const updateNotificationParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const notificationIdSchema = baseSchema.pick({ id: true });

// Types for notifications - used to type API request params and within Components
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = z.infer<typeof insertNotificationSchema>;
export type NewNotificationParams = z.infer<typeof insertNotificationParams>;
export type UpdateNotificationParams = z.infer<typeof updateNotificationParams>;
export type NotificationId = z.infer<typeof notificationIdSchema>["id"];
    
// this type infers the return from getNotifications() - meaning it will include any joins
export type CompleteNotification = Awaited<ReturnType<typeof getNotifications>>["notifications"][number];

