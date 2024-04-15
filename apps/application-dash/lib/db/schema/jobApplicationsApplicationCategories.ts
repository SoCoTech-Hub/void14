import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { jobApplications } from "./jobApplications"
import { applicationCategories } from "./applicationCategories"
import { type getJobApplicationsApplicationCategories } from "@/lib/api/jobApplicationsApplicationCategories/queries";

import { nanoid } from "@/lib/utils";


export const jobApplicationsApplicationCategories = pgTable('job_applications_application_categories', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  jobApplicationId: varchar("job_application_id", { length: 256 }).references(() => jobApplications.id, { onDelete: "cascade" }).notNull(),
  applicationCategoryId: varchar("application_category_id", { length: 256 }).references(() => applicationCategories.id, { onDelete: "cascade" }).notNull()
});


// Schema for jobApplicationsApplicationCategories - used to validate API requests
const baseSchema = createSelectSchema(jobApplicationsApplicationCategories)

export const insertJobApplicationsApplicationCategorySchema = createInsertSchema(jobApplicationsApplicationCategories);
export const insertJobApplicationsApplicationCategoryParams = baseSchema.extend({
  jobApplicationId: z.coerce.string().min(1),
  applicationCategoryId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateJobApplicationsApplicationCategorySchema = baseSchema;
export const updateJobApplicationsApplicationCategoryParams = baseSchema.extend({
  jobApplicationId: z.coerce.string().min(1),
  applicationCategoryId: z.coerce.string().min(1)
})
export const jobApplicationsApplicationCategoryIdSchema = baseSchema.pick({ id: true });

// Types for jobApplicationsApplicationCategories - used to type API request params and within Components
export type JobApplicationsApplicationCategory = typeof jobApplicationsApplicationCategories.$inferSelect;
export type NewJobApplicationsApplicationCategory = z.infer<typeof insertJobApplicationsApplicationCategorySchema>;
export type NewJobApplicationsApplicationCategoryParams = z.infer<typeof insertJobApplicationsApplicationCategoryParams>;
export type UpdateJobApplicationsApplicationCategoryParams = z.infer<typeof updateJobApplicationsApplicationCategoryParams>;
export type JobApplicationsApplicationCategoryId = z.infer<typeof jobApplicationsApplicationCategoryIdSchema>["id"];
    
// this type infers the return from getJobApplicationsApplicationCategories() - meaning it will include any joins
export type CompleteJobApplicationsApplicationCategory = Awaited<ReturnType<typeof getJobApplicationsApplicationCategories>>["jobApplicationsApplicationCategories"][number];

