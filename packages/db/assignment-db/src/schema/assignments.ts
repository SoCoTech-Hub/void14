
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const assignments = pgTable(
  "assignments",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assignmentType: varchar("assignment_type", { length: 256 }),
    courseId: varchar("course_id", { length: 191 }),
    emailTeachers: boolean("email_teachers"),
    gradeId: varchar("grade_id", { length: 191 }),
    intro: text("intro"),
    introFormat: integer("intro_format"),
    maxBytes: integer("max_bytes"),
    name: varchar("name", { length: 256 }),
    preventLate: boolean("prevent_late"),
    resubmit: boolean("resubmit"),
    timeAvailable: integer("time_available"),
    timeDue: integer("time_due"),
    var1: varchar("var1", { length: 256 }),
    var2: varchar("var2", { length: 256 }),
    var3: varchar("var3", { length: 256 }),
    var4: varchar("var4", { length: 256 }),
    var5: varchar("var5", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (assignments) => {
    return {
      courseIdIndex: uniqueIndex("a_course_id_idx").on(assignments.courseId),
    };
  },
);

// Schema for assignments - used to validate API requests
const baseSchema = createSelectSchema(assignments).omit(timestamps);

export const insertAssignmentSchema =
  createInsertSchema(assignments).omit(timestamps);
export const insertAssignmentParams = baseSchema
  .extend({
    emailTeachers: z.coerce.boolean(),
    introFormat: z.coerce.number(),
    maxBytes: z.coerce.number(),
    preventLate: z.coerce.boolean(),
    resubmit: z.coerce.boolean(),
    timeAvailable: z.coerce.number(),
    timeDue: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAssignmentSchema = baseSchema;
export const updateAssignmentParams = baseSchema.extend({
  emailTeachers: z.coerce.boolean(),
  introFormat: z.coerce.number(),
  maxBytes: z.coerce.number(),
  preventLate: z.coerce.boolean(),
  resubmit: z.coerce.boolean(),
  timeAvailable: z.coerce.number(),
  timeDue: z.coerce.number(),
});
export const assignmentIdSchema = baseSchema.pick({ id: true });

// Types for assignments - used to type API request params and within Components
export type Assignment = typeof assignments.$inferSelect;
export type NewAssignment = z.infer<typeof insertAssignmentSchema>;
export type NewAssignmentParams = z.infer<typeof insertAssignmentParams>;
export type UpdateAssignmentParams = z.infer<typeof updateAssignmentParams>;
export type AssignmentId = z.infer<typeof assignmentIdSchema>["id"];


