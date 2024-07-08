import { type getQuizOverviewRegrades } from "@/lib/api/quizOverviewRegrades/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  real,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const quizOverviewRegrades = pgTable(
  "quiz_overview_regrades",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    newFraction: real("new_fraction"),
    oldFraction: real("old_fraction"),
    questionUsageId: varchar("question_usage_id", { length: 256 }).notNull(),
    regraded: boolean("regraded").notNull().default(false),
    slotId: varchar("slot_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (quizOverviewRegrades) => {
    return {
      slotIdIndex: uniqueIndex("slot_id_idx").on(quizOverviewRegrades.slotId),
    };
  },
);

// Schema for quizOverviewRegrades - used to validate API requests
const baseSchema = createSelectSchema(quizOverviewRegrades).omit(timestamps);

export const insertQuizOverviewRegradeSchema =
  createInsertSchema(quizOverviewRegrades).omit(timestamps);
export const insertQuizOverviewRegradeParams = baseSchema
  .extend({
    newFraction: z.coerce.number(),
    oldFraction: z.coerce.number(),
    regraded: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQuizOverviewRegradeSchema = baseSchema;
export const updateQuizOverviewRegradeParams = baseSchema.extend({
  newFraction: z.coerce.number(),
  oldFraction: z.coerce.number(),
  regraded: z.coerce.boolean(),
});
export const quizOverviewRegradeIdSchema = baseSchema.pick({ id: true });

// Types for quizOverviewRegrades - used to type API request params and within Components
export type QuizOverviewRegrade = typeof quizOverviewRegrades.$inferSelect;
export type NewQuizOverviewRegrade = z.infer<
  typeof insertQuizOverviewRegradeSchema
>;
export type NewQuizOverviewRegradeParams = z.infer<
  typeof insertQuizOverviewRegradeParams
>;
export type UpdateQuizOverviewRegradeParams = z.infer<
  typeof updateQuizOverviewRegradeParams
>;
export type QuizOverviewRegradeId = z.infer<
  typeof quizOverviewRegradeIdSchema
>["id"];

// this type infers the return from getQuizOverviewRegrades() - meaning it will include any joins
export type CompleteQuizOverviewRegrade = Awaited<
  ReturnType<typeof getQuizOverviewRegrades>
>["quizOverviewRegrades"][number];
