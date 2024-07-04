import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getAssignSubmissions } from "../../api/assignSubmissions/queries";
import { assignments } from "./assignments";

export const assignSubmissions = pgTable(
  "assign_submissions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assignmentId: varchar("assignment_id", { length: 256 })
      .references(() => assignments.id)
      .notNull(),
    attemptNumber: integer("attempt_number"),
    groupId: varchar("group_id", { length: 256 }),
    latest: boolean("latest"),
    status: varchar("status", { length: 256 }),
    timeStarted: timestamp("time_started"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (assignSubmissions) => {
    return {
      assignmentIdIndex: uniqueIndex("asub_assignment_id_idx").on(
        assignSubmissions.assignmentId,
      ),
    };
  },
);

// Schema for assignSubmissions - used to validate API requests
const baseSchema = createSelectSchema(assignSubmissions).omit(timestamps);

export const insertAssignSubmissionSchema =
  createInsertSchema(assignSubmissions).omit(timestamps);
export const insertAssignSubmissionParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
    attemptNumber: z.coerce.number(),
    latest: z.coerce.boolean(),
    timeStarted: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAssignSubmissionSchema = baseSchema;
export const updateAssignSubmissionParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
    attemptNumber: z.coerce.number(),
    latest: z.coerce.boolean(),
    timeStarted: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const assignSubmissionIdSchema = baseSchema.pick({ id: true });

// Types for assignSubmissions - used to type API request params and within Components
export type AssignSubmission = typeof assignSubmissions.$inferSelect;
export type NewAssignSubmission = z.infer<typeof insertAssignSubmissionSchema>;
export type NewAssignSubmissionParams = z.infer<
  typeof insertAssignSubmissionParams
>;
export type UpdateAssignSubmissionParams = z.infer<
  typeof updateAssignSubmissionParams
>;
export type AssignSubmissionId = z.infer<typeof assignSubmissionIdSchema>["id"];

// this type infers the return from getAssignSubmissions() - meaning it will include any joins
export type CompleteAssignSubmission = Awaited<
  ReturnType<typeof getAssignSubmissions>
>["assignSubmissions"][number];
