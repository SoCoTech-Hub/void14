import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const messageReads = pgTable("message_reads", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  contextUrl: text("context_url"),
  contextUrlName: text("context_url_name"),
  eventType: varchar("event_type", { length: 256 }),
  fullMessage: text("full_message"),
  fullMessageFormat: integer("full_message_format"),
  fullMessageHtml: text("full_message_html"),
  notification: boolean("notification"),
  smallMessage: text("small_message"),
  subject: text("subject"),
  timeRead: timestamp("time_read"),
  timeUserFromDeleted: timestamp("time_user_from_deleted"),
  timeUserToDeleted: timestamp("time_user_to_deleted"),
  userIdFrom: varchar("user_id_from", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for messageReads - used to validate API requests
const baseSchema = createSelectSchema(messageReads).omit(timestamps);

export const insertMessageReadSchema =
  createInsertSchema(messageReads).omit(timestamps);
export const insertMessageReadParams = baseSchema
  .extend({
    fullMessageFormat: z.coerce.number(),
    notification: z.coerce.boolean(),
    timeRead: z.coerce.string().min(1),
    timeUserFromDeleted: z.coerce.string().min(1),
    timeUserToDeleted: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMessageReadSchema = baseSchema;
export const updateMessageReadParams = baseSchema
  .extend({
    fullMessageFormat: z.coerce.number(),
    notification: z.coerce.boolean(),
    timeRead: z.coerce.string().min(1),
    timeUserFromDeleted: z.coerce.string().min(1),
    timeUserToDeleted: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const messageReadIdSchema = baseSchema.pick({ id: true });

// Types for messageReads - used to type API request params and within Components
export type MessageRead = typeof messageReads.$inferSelect;
export type NewMessageRead = z.infer<typeof insertMessageReadSchema>;
export type NewMessageReadParams = z.infer<typeof insertMessageReadParams>;
export type UpdateMessageReadParams = z.infer<typeof updateMessageReadParams>;
export type MessageReadId = z.infer<typeof messageReadIdSchema>["id"];
