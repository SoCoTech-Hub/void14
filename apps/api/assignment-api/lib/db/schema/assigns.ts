import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getAssigns } from "../../api/assigns/queries";

export const assigns = pgTable("assigns", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  activity: text("activity"),
  activityFormat: integer("activity_format"),
  allowSubmissionsFromDate: timestamp("allow_submissions_from_date"),
  alwaysShowDescription: boolean("always_show_description"),
  attemptReopenMethod: varchar("attempt_reopen_method", { length: 256 }),
  blindMarking: boolean("blind_marking"),
  completionSubmit: boolean("completion_submit"),
  courseId: varchar("course_id", { length: 256 }),
  cutOffDate: timestamp("cut_off_date"),
  dueDate: timestamp("due_date"),
  grade: integer("grade"),
  gradingDueDate: timestamp("grading_due_date"),
  hideGrader: boolean("hide_grader"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  markingAllocation: boolean("marking_allocation"),
  markingWorkflow: boolean("marking_workflow"),
  maxAttempts: integer("max_attempts"),
  name: varchar("name", { length: 256 }),
  noSubmissions: boolean("no_submissions"),
  preventSubmissionNotinGroup: boolean("prevent_submission_notin_group"),
  requireAllTeamMembersSubmit: boolean("require_all_team_members_submit"),
  requireSubmissionStatement: boolean("require_submission_statement"),
  revealIdentities: boolean("reveal_identities"),
  sendLateNotifications: boolean("send_late_notifications"),
  sendNotifications: boolean("send_notifications"),
  sendStudentNotifications: boolean("send_student_notifications"),
  submissionAttachments: boolean("submission_attachments"),
  submissionDrafts: boolean("submission_drafts"),
  teamSubmission: boolean("team_submission"),
  teamSubmissionGroupingId: varchar("team_submission_grouping_id", {
    length: 256,
  }),
  timeLimit: timestamp("time_limit"),
  asdasdasd: varchar("asdasdasd", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for assigns - used to validate API requests
const baseSchema = createSelectSchema(assigns).omit(timestamps);

export const insertAssignSchema = createInsertSchema(assigns).omit(timestamps);
export const insertAssignParams = baseSchema
  .extend({
    activityFormat: z.coerce.number(),
    allowSubmissionsFromDate: z.coerce.string().min(1),
    alwaysShowDescription: z.coerce.boolean(),
    blindMarking: z.coerce.boolean(),
    completionSubmit: z.coerce.boolean(),
    cutOffDate: z.coerce.string().min(1),
    dueDate: z.coerce.string().min(1),
    grade: z.coerce.number(),
    gradingDueDate: z.coerce.string().min(1),
    hideGrader: z.coerce.boolean(),
    introFormat: z.coerce.number(),
    markingAllocation: z.coerce.boolean(),
    markingWorkflow: z.coerce.boolean(),
    maxAttempts: z.coerce.number(),
    noSubmissions: z.coerce.boolean(),
    preventSubmissionNotinGroup: z.coerce.boolean(),
    requireAllTeamMembersSubmit: z.coerce.boolean(),
    requireSubmissionStatement: z.coerce.boolean(),
    revealIdentities: z.coerce.boolean(),
    sendLateNotifications: z.coerce.boolean(),
    sendNotifications: z.coerce.boolean(),
    sendStudentNotifications: z.coerce.boolean(),
    submissionAttachments: z.coerce.boolean(),
    submissionDrafts: z.coerce.boolean(),
    teamSubmission: z.coerce.boolean(),
    timeLimit: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateAssignSchema = baseSchema;
export const updateAssignParams = baseSchema.extend({
  activityFormat: z.coerce.number(),
  allowSubmissionsFromDate: z.coerce.string().min(1),
  alwaysShowDescription: z.coerce.boolean(),
  blindMarking: z.coerce.boolean(),
  completionSubmit: z.coerce.boolean(),
  cutOffDate: z.coerce.string().min(1),
  dueDate: z.coerce.string().min(1),
  grade: z.coerce.number(),
  gradingDueDate: z.coerce.string().min(1),
  hideGrader: z.coerce.boolean(),
  introFormat: z.coerce.number(),
  markingAllocation: z.coerce.boolean(),
  markingWorkflow: z.coerce.boolean(),
  maxAttempts: z.coerce.number(),
  noSubmissions: z.coerce.boolean(),
  preventSubmissionNotinGroup: z.coerce.boolean(),
  requireAllTeamMembersSubmit: z.coerce.boolean(),
  requireSubmissionStatement: z.coerce.boolean(),
  revealIdentities: z.coerce.boolean(),
  sendLateNotifications: z.coerce.boolean(),
  sendNotifications: z.coerce.boolean(),
  sendStudentNotifications: z.coerce.boolean(),
  submissionAttachments: z.coerce.boolean(),
  submissionDrafts: z.coerce.boolean(),
  teamSubmission: z.coerce.boolean(),
  timeLimit: z.coerce.string().min(1),
});
export const assignIdSchema = baseSchema.pick({ id: true });

// Types for assigns - used to type API request params and within Components
export type Assign = typeof assigns.$inferSelect;
export type NewAssign = z.infer<typeof insertAssignSchema>;
export type NewAssignParams = z.infer<typeof insertAssignParams>;
export type UpdateAssignParams = z.infer<typeof updateAssignParams>;
export type AssignId = z.infer<typeof assignIdSchema>["id"];

// this type infers the return from getAssigns() - meaning it will include any joins
export type CompleteAssign = Awaited<
  ReturnType<typeof getAssigns>
>["assigns"][number];
