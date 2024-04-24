import { varchar, text, date, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getQualifications } from "@/lib/api/qualifications/queries";

import { nanoid } from "@/lib/utils";


export const qualifications = pgTable('qualifications', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  institution: varchar("institution", { length: 256 }),
  duration: varchar("duration", { length: 256 }),
  programDescription: text("program_description"),
  shortDescription: text("short_description"),
  degree: varchar("degree", { length: 256 }),
  requirements: text("requirements"),
  openDate: date("open_date"),
  closeDate: date("close_date"),
  description: text("description"),
  url: varchar("url", { length: 256 }),
  hashtags: varchar("hashtags", { length: 256 }),
  authorId: varchar("author_id", { length: 256 }),
  organizationId: varchar("organization_id", { length: 256 }),
  subjectsId: varchar("subjects_id", { length: 256 }),
  universityId: varchar("university_id", { length: 256 }),
  facilityId: varchar("facility_id", { length: 256 })
});


// Schema for qualifications - used to validate API requests
const baseSchema = createSelectSchema(qualifications)

export const insertQualificationSchema = createInsertSchema(qualifications);
export const insertQualificationParams = baseSchema.extend({
  openDate: z.coerce.string().min(1),
  closeDate: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateQualificationSchema = baseSchema;
export const updateQualificationParams = baseSchema.extend({
  openDate: z.coerce.string().min(1),
  closeDate: z.coerce.string().min(1)
})
export const qualificationIdSchema = baseSchema.pick({ id: true });

// Types for qualifications - used to type API request params and within Components
export type Qualification = typeof qualifications.$inferSelect;
export type NewQualification = z.infer<typeof insertQualificationSchema>;
export type NewQualificationParams = z.infer<typeof insertQualificationParams>;
export type UpdateQualificationParams = z.infer<typeof updateQualificationParams>;
export type QualificationId = z.infer<typeof qualificationIdSchema>["id"];
    
// this type infers the return from getQualifications() - meaning it will include any joins
export type CompleteQualification = Awaited<ReturnType<typeof getQualifications>>["qualifications"][number];

