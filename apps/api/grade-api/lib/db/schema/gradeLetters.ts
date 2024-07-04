import { pgTable, real, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGradeLetters } from "../api/gradeLetters/queries";

export const gradeLetters = pgTable("grade_letters", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  letter: varchar("letter", { length: 256 }),
  lowerBoundary: real("lower_boundary"),
});

// Schema for gradeLetters - used to validate API requests
const baseSchema = createSelectSchema(gradeLetters);

export const insertGradeLetterSchema = createInsertSchema(gradeLetters);
export const insertGradeLetterParams = baseSchema
  .extend({
    lowerBoundary: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradeLetterSchema = baseSchema;
export const updateGradeLetterParams = baseSchema.extend({
  lowerBoundary: z.coerce.number(),
});
export const gradeLetterIdSchema = baseSchema.pick({ id: true });

// Types for gradeLetters - used to type API request params and within Components
export type GradeLetter = typeof gradeLetters.$inferSelect;
export type NewGradeLetter = z.infer<typeof insertGradeLetterSchema>;
export type NewGradeLetterParams = z.infer<typeof insertGradeLetterParams>;
export type UpdateGradeLetterParams = z.infer<typeof updateGradeLetterParams>;
export type GradeLetterId = z.infer<typeof gradeLetterIdSchema>["id"];

// this type infers the return from getGradeLetters() - meaning it will include any joins
export type CompleteGradeLetter = Awaited<
  ReturnType<typeof getGradeLetters>
>["gradeLetters"][number];
