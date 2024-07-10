import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { grades } from "./grades";

export const userGrades = pgTable("user_grades", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  gradeId: varchar("grade_id", { length: 256 })
    .references(() => grades.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for userGrades - used to validate API requests
const baseSchema = createSelectSchema(userGrades);

export const insertUserGradeSchema = createInsertSchema(userGrades);
export const insertUserGradeParams = baseSchema
  .extend({
    gradeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateUserGradeSchema = baseSchema;
export const updateUserGradeParams = baseSchema
  .extend({
    gradeId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const userGradeIdSchema = baseSchema.pick({ id: true });

// Types for userGrades - used to type API request params and within Components
export type UserGrade = typeof userGrades.$inferSelect;
export type NewUserGrade = z.infer<typeof insertUserGradeSchema>;
export type NewUserGradeParams = z.infer<typeof insertUserGradeParams>;
export type UpdateUserGradeParams = z.infer<typeof updateUserGradeParams>;
export type UserGradeId = z.infer<typeof userGradeIdSchema>["id"];
