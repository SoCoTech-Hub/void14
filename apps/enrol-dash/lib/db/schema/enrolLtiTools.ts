import { sql } from "drizzle-orm";
import { varchar, boolean, integer, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getEnrolLtiTools } from "@/lib/api/enrolLtiTools/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const enrolLtiTools = pgTable('enrol_lti_tools', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  city: varchar("city", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  country: varchar("country", { length: 256 }),
  enrolId: varchar("enrol_id", { length: 256 }),
  gradeSync: boolean("grade_sync"),
  gradeSyncCompletion: boolean("grade_sync_completion"),
  institution: varchar("institution", { length: 256 }),
  lang: varchar("lang", { length: 256 }),
  ltiVersion: varchar("lti_version", { length: 256 }),
  mailDisplay: integer("mail_display"),
  maxEnrolled: integer("max_enrolled"),
  memberSync: boolean("member_sync"),
  memberSyncMode: boolean("member_sync_mode"),
  provisioningModeInstructor: integer("provisioning_mode_instructor"),
  provisioningModeLearner: integer("provisioning_mode_learner"),
  roleInstructor: varchar("role_instructor", { length: 256 }),
  roleLearner: varchar("role_learner", { length: 256 }),
  secret: text("secret"),
  timeZone: varchar("time_zone", { length: 256 }),
  uuid: varchar("uuid", { length: 256 }),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for enrolLtiTools - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiTools).omit(timestamps)

export const insertEnrolLtiToolSchema = createInsertSchema(enrolLtiTools).omit(timestamps);
export const insertEnrolLtiToolParams = baseSchema.extend({
  gradeSync: z.coerce.boolean(),
  gradeSyncCompletion: z.coerce.boolean(),
  mailDisplay: z.coerce.number(),
  maxEnrolled: z.coerce.number(),
  memberSync: z.coerce.boolean(),
  memberSyncMode: z.coerce.boolean(),
  provisioningModeInstructor: z.coerce.number(),
  provisioningModeLearner: z.coerce.number()
}).omit({ 
  id: true
});

export const updateEnrolLtiToolSchema = baseSchema;
export const updateEnrolLtiToolParams = baseSchema.extend({
  gradeSync: z.coerce.boolean(),
  gradeSyncCompletion: z.coerce.boolean(),
  mailDisplay: z.coerce.number(),
  maxEnrolled: z.coerce.number(),
  memberSync: z.coerce.boolean(),
  memberSyncMode: z.coerce.boolean(),
  provisioningModeInstructor: z.coerce.number(),
  provisioningModeLearner: z.coerce.number()
})
export const enrolLtiToolIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiTools - used to type API request params and within Components
export type EnrolLtiTool = typeof enrolLtiTools.$inferSelect;
export type NewEnrolLtiTool = z.infer<typeof insertEnrolLtiToolSchema>;
export type NewEnrolLtiToolParams = z.infer<typeof insertEnrolLtiToolParams>;
export type UpdateEnrolLtiToolParams = z.infer<typeof updateEnrolLtiToolParams>;
export type EnrolLtiToolId = z.infer<typeof enrolLtiToolIdSchema>["id"];
    
// this type infers the return from getEnrolLtiTools() - meaning it will include any joins
export type CompleteEnrolLtiTool = Awaited<ReturnType<typeof getEnrolLtiTools>>["enrolLtiTools"][number];

