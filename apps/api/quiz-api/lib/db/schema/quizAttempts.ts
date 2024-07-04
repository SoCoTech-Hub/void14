import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getQuizAttempts } from "../../api/quizAttempts/queries";
import { quizes } from "./quizes";

export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    attempt: integer("attempt"),
    currentPage: integer("current_page").notNull(),
    gradedNotificationSentTime: integer("graded_notification_sent_time"),
    layout: text("layout"),
    preview: boolean("preview").notNull().default(false),
    quizId: varchar("quiz_id", { length: 256 })
      .references(() => quizes.id, { onDelete: "cascade" })
      .notNull(),
    state: varchar("state", { length: 256 }),
    sumGrades: real("sum_grades"),
    timeCheckState: integer("time_check_state"),
    timeFinish: integer("time_finish"),
    timeModifiedOffline: integer("time_modified_offline"),
    timeStart: integer("time_start"),
    uniqueId: varchar("unique_id", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (quizAttempts) => {
    return {
      quizIdIndex: uniqueIndex("quiz_attempts_quiz_id_idx").on(
        quizAttempts.quizId,
      ),
    };
  },
);

// Schema for quizAttempts - used to validate API requests
const baseSchema = createSelectSchema(quizAttempts).omit(timestamps);

export const insertQuizAttemptSchema =
  createInsertSchema(quizAttempts).omit(timestamps);
export const insertQuizAttemptParams = baseSchema
  .extend({
    attempt: z.coerce.number(),
    currentPage: z.coerce.number(),
    gradedNotificationSentTime: z.coerce.number(),
    preview: z.coerce.boolean(),
    quizId: z.coerce.string().min(1),
    sumGrades: z.coerce.number(),
    timeCheckState: z.coerce.number(),
    timeFinish: z.coerce.number(),
    timeModifiedOffline: z.coerce.number(),
    timeStart: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateQuizAttemptSchema = baseSchema;
export const updateQuizAttemptParams = baseSchema
  .extend({
    attempt: z.coerce.number(),
    currentPage: z.coerce.number(),
    gradedNotificationSentTime: z.coerce.number(),
    preview: z.coerce.boolean(),
    quizId: z.coerce.string().min(1),
    sumGrades: z.coerce.number(),
    timeCheckState: z.coerce.number(),
    timeFinish: z.coerce.number(),
    timeModifiedOffline: z.coerce.number(),
    timeStart: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const quizAttemptIdSchema = baseSchema.pick({ id: true });

// Types for quizAttempts - used to type API request params and within Components
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type NewQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type NewQuizAttemptParams = z.infer<typeof insertQuizAttemptParams>;
export type UpdateQuizAttemptParams = z.infer<typeof updateQuizAttemptParams>;
export type QuizAttemptId = z.infer<typeof quizAttemptIdSchema>["id"];

// this type infers the return from getQuizAttempts() - meaning it will include any joins
export type CompleteQuizAttempt = Awaited<
  ReturnType<typeof getQuizAttempts>
>["quizAttempts"][number];
