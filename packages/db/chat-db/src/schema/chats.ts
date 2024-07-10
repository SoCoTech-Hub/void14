import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const chats = pgTable(
  "chats",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    chatTime: integer("chat_time"),
    courseId: varchar("course_id", { length: 256 }),
    intro: text("intro"),
    introFormat: integer("intro_format"),
    keepDays: integer("keep_days"),
    name: varchar("name", { length: 256 }),
    schedule: integer("schedule"),
    studentLogs: integer("student_logs"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (chats) => {
    return {
      courseIdIndex: uniqueIndex("c_course_id_idx").on(chats.courseId),
    };
  },
);

// Schema for chats - used to validate API requests
const baseSchema = createSelectSchema(chats).omit(timestamps);

export const insertChatSchema = createInsertSchema(chats).omit(timestamps);
export const insertChatParams = baseSchema
  .extend({
    chatTime: z.coerce.number(),
    introFormat: z.coerce.number(),
    keepDays: z.coerce.number(),
    schedule: z.coerce.number(),
    studentLogs: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateChatSchema = baseSchema;
export const updateChatParams = baseSchema.extend({
  chatTime: z.coerce.number(),
  introFormat: z.coerce.number(),
  keepDays: z.coerce.number(),
  schedule: z.coerce.number(),
  studentLogs: z.coerce.number(),
});
export const chatIdSchema = baseSchema.pick({ id: true });

// Types for chats - used to type API request params and within Components
export type Chat = typeof chats.$inferSelect;
export type NewChat = z.infer<typeof insertChatSchema>;
export type NewChatParams = z.infer<typeof insertChatParams>;
export type UpdateChatParams = z.infer<typeof updateChatParams>;
export type ChatId = z.infer<typeof chatIdSchema>["id"];
