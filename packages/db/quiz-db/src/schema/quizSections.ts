import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { quizes } from "./quizes";

export const quizSections = pgTable(
  "quiz_sections",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    firstSlot: integer("first_slot"),
    heading: text("heading"),
    quizId: varchar("quiz_id", { length: 256 })
      .references(() => quizes.id, { onDelete: "cascade" })
      .notNull(),
    shuffleQuestions: boolean("shuffle_questions").notNull().default(false),
  },
  (quizSections) => {
    return {
      quizIdIndex: uniqueIndex("quiz_id_idx").on(quizSections.quizId),
    };
  },
);

// Schema for quizSections - used to validate API requests
const baseSchema = createSelectSchema(quizSections);

export const insertQuizSectionSchema = createInsertSchema(quizSections);
export const insertQuizSectionParams = baseSchema
  .extend({
    firstSlot: z.coerce.number(),
    quizId: z.coerce.string().min(1),
    shuffleQuestions: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQuizSectionSchema = baseSchema;
export const updateQuizSectionParams = baseSchema.extend({
  firstSlot: z.coerce.number(),
  quizId: z.coerce.string().min(1),
  shuffleQuestions: z.coerce.boolean(),
});
export const quizSectionIdSchema = baseSchema.pick({ id: true });

// Types for quizSections - used to type API request params and within Components
export type QuizSection = typeof quizSections.$inferSelect;
export type NewQuizSection = z.infer<typeof insertQuizSectionSchema>;
export type NewQuizSectionParams = z.infer<typeof insertQuizSectionParams>;
export type UpdateQuizSectionParams = z.infer<typeof updateQuizSectionParams>;
export type QuizSectionId = z.infer<typeof quizSectionIdSchema>["id"];
