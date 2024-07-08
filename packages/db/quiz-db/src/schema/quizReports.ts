import { type getQuizReports } from "@/lib/api/quizReports/queries";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const quizReports = pgTable(
  "quiz_reports",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    capability: varchar("capability", { length: 256 }),
    displayOrder: integer("display_order"),
    name: varchar("name", { length: 256 }),
  },
  (quizReports) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(quizReports.name),
    };
  },
);

// Schema for quizReports - used to validate API requests
const baseSchema = createSelectSchema(quizReports);

export const insertQuizReportSchema = createInsertSchema(quizReports);
export const insertQuizReportParams = baseSchema
  .extend({
    displayOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQuizReportSchema = baseSchema;
export const updateQuizReportParams = baseSchema.extend({
  displayOrder: z.coerce.number(),
});
export const quizReportIdSchema = baseSchema.pick({ id: true });

// Types for quizReports - used to type API request params and within Components
export type QuizReport = typeof quizReports.$inferSelect;
export type NewQuizReport = z.infer<typeof insertQuizReportSchema>;
export type NewQuizReportParams = z.infer<typeof insertQuizReportParams>;
export type UpdateQuizReportParams = z.infer<typeof updateQuizReportParams>;
export type QuizReportId = z.infer<typeof quizReportIdSchema>["id"];

// this type infers the return from getQuizReports() - meaning it will include any joins
export type CompleteQuizReport = Awaited<
  ReturnType<typeof getQuizReports>
>["quizReports"][number];
