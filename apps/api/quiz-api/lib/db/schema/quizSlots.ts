import { type getQuizSlots } from "@/lib/api/quizSlots/queries";
import {
  boolean,
  integer,
  pgTable,
  real,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { quizes } from "./quizes";

export const quizSlots = pgTable(
  "quiz_slots",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    maxMark: real("max_mark"),
    page: integer("page").notNull(),
    quizId: varchar("quiz_id", { length: 256 })
      .references(() => quizes.id, { onDelete: "cascade" })
      .notNull(),
    requirePrevious: boolean("require_previous").notNull().default(false),
    slot: integer("slot").notNull(),
  },
  (quizSlots) => {
    return {
      quizIdIndex: uniqueIndex("quiz_slots_quiz_id_idx").on(quizSlots.quizId),
    };
  },
);

// Schema for quizSlots - used to validate API requests
const baseSchema = createSelectSchema(quizSlots);

export const insertQuizSlotSchema = createInsertSchema(quizSlots);
export const insertQuizSlotParams = baseSchema
  .extend({
    maxMark: z.coerce.number(),
    page: z.coerce.number(),
    quizId: z.coerce.string().min(1),
    requirePrevious: z.coerce.boolean(),
    slot: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQuizSlotSchema = baseSchema;
export const updateQuizSlotParams = baseSchema.extend({
  maxMark: z.coerce.number(),
  page: z.coerce.number(),
  quizId: z.coerce.string().min(1),
  requirePrevious: z.coerce.boolean(),
  slot: z.coerce.number(),
});
export const quizSlotIdSchema = baseSchema.pick({ id: true });

// Types for quizSlots - used to type API request params and within Components
export type QuizSlot = typeof quizSlots.$inferSelect;
export type NewQuizSlot = z.infer<typeof insertQuizSlotSchema>;
export type NewQuizSlotParams = z.infer<typeof insertQuizSlotParams>;
export type UpdateQuizSlotParams = z.infer<typeof updateQuizSlotParams>;
export type QuizSlotId = z.infer<typeof quizSlotIdSchema>["id"];

// this type infers the return from getQuizSlots() - meaning it will include any joins
export type CompleteQuizSlot = Awaited<
  ReturnType<typeof getQuizSlots>
>["quizSlots"][number];
