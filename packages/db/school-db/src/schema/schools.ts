import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { grades } from "./grades";

export const schools = pgTable(
  "schools",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    telephone: varchar("telephone", { length: 256 }),
    country: varchar("country", { length: 256 }),
    province: varchar("province", { length: 256 }),
    suburb: varchar("suburb", { length: 256 }),
    district: varchar("district", { length: 256 }),
    gradeId: varchar("grade_id", { length: 256 })
      .references(() => grades.id, { onDelete: "cascade" })
      .notNull(),
  },
  (schools) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(schools.name),
    };
  },
);

// Schema for schools - used to validate API requests
const baseSchema = createSelectSchema(schools);

export const insertSchoolSchema = createInsertSchema(schools);
export const insertSchoolParams = baseSchema
  .extend({
    gradeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateSchoolSchema = baseSchema;
export const updateSchoolParams = baseSchema.extend({
  gradeId: z.coerce.string().min(1),
});
export const schoolIdSchema = baseSchema.pick({ id: true });

// Types for schools - used to type API request params and within Components
export type School = typeof schools.$inferSelect;
export type NewSchool = z.infer<typeof insertSchoolSchema>;
export type NewSchoolParams = z.infer<typeof insertSchoolParams>;
export type UpdateSchoolParams = z.infer<typeof updateSchoolParams>;
export type SchoolId = z.infer<typeof schoolIdSchema>["id"];


