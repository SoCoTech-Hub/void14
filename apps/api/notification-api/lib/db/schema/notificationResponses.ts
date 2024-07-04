import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getNotificationResponses } from "../api/notificationResponses/queries";
import { notifications } from "./notifications";

export const notificationResponses = pgTable("notification_responses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  read: boolean("read"),
  new: boolean("new"),
  notificationId: varchar("notification_id", { length: 256 })
    .references(() => notifications.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for notificationResponses - used to validate API requests
const baseSchema = createSelectSchema(notificationResponses);

export const insertNotificationResponseSchema = createInsertSchema(
  notificationResponses,
);
export const insertNotificationResponseParams = baseSchema
  .extend({
    read: z.coerce.boolean(),
    new: z.coerce.boolean(),
    notificationId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateNotificationResponseSchema = baseSchema;
export const updateNotificationResponseParams = baseSchema
  .extend({
    read: z.coerce.boolean(),
    new: z.coerce.boolean(),
    notificationId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const notificationResponseIdSchema = baseSchema.pick({ id: true });

// Types for notificationResponses - used to type API request params and within Components
export type NotificationResponse = typeof notificationResponses.$inferSelect;
export type NewNotificationResponse = z.infer<
  typeof insertNotificationResponseSchema
>;
export type NewNotificationResponseParams = z.infer<
  typeof insertNotificationResponseParams
>;
export type UpdateNotificationResponseParams = z.infer<
  typeof updateNotificationResponseParams
>;
export type NotificationResponseId = z.infer<
  typeof notificationResponseIdSchema
>["id"];

// this type infers the return from getNotificationResponses() - meaning it will include any joins
export type CompleteNotificationResponse = Awaited<
  ReturnType<typeof getNotificationResponses>
>["notificationResponses"][number];
