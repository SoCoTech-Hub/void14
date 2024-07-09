import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const subjects = pgTable("subjects", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  icon: varchar("icon", { length: 256 }),
  color: varchar("color", { length: 256 }),
});

// Schema for subjects - used to validate API requests
const baseSchema = createSelectSchema(subjects);

export const insertSubjectSchema = createInsertSchema(subjects);
export const insertSubjectParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateSubjectSchema = baseSchema;
export const updateSubjectParams = baseSchema.extend({});
export const subjectIdSchema = baseSchema.pick({ id: true });

// Types for subjects - used to type API request params and within Components
export type Subject = typeof subjects.$inferSelect;
export type NewSubject = z.infer<typeof insertSubjectSchema>;
export type NewSubjectParams = z.infer<typeof insertSubjectParams>;
export type UpdateSubjectParams = z.infer<typeof updateSubjectParams>;
export type SubjectId = z.infer<typeof subjectIdSchema>["id"];

