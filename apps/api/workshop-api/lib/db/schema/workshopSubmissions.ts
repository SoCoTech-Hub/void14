import { type getWorkshopSubmissions } from "@/lib/api/workshopSubmissions/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { workshops } from "./workshops";

export const workshopSubmissions = pgTable(
  "workshop_submissions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    attachment: integer("attachment"),
    content: text("content"),
    contentFormat: integer("content_format"),
    contentTrust: integer("content_trust"),
    example: integer("example"),
    feedbackAuthor: varchar("feedback_author", { length: 256 }),
    feedbackAuthor0: text("feedback_author0"),
    feedbackAuthorFormat: integer("feedback_author_format"),
    grade: real("grade"),
    gradeOver: real("grade_over"),
    gradeOverBy: varchar("grade_over_by", { length: 256 }),
    late: integer("late"),
    published: boolean("published"),
    title: varchar("title", { length: 256 }),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (workshopSubmissions) => {
    return {
      workshopIdIndex: uniqueIndex("workshop_submissions_workshop_id_idx").on(
        workshopSubmissions.workshopId,
      ),
    };
  },
);

// Schema for workshopSubmissions - used to validate API requests
const baseSchema = createSelectSchema(workshopSubmissions).omit(timestamps);

export const insertWorkshopSubmissionSchema =
  createInsertSchema(workshopSubmissions).omit(timestamps);
export const insertWorkshopSubmissionParams = baseSchema
  .extend({
    attachment: z.coerce.number(),
    contentFormat: z.coerce.number(),
    contentTrust: z.coerce.number(),
    example: z.coerce.number(),
    feedbackAuthorFormat: z.coerce.number(),
    grade: z.coerce.number(),
    gradeOver: z.coerce.number(),
    late: z.coerce.number(),
    published: z.coerce.boolean(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateWorkshopSubmissionSchema = baseSchema;
export const updateWorkshopSubmissionParams = baseSchema
  .extend({
    attachment: z.coerce.number(),
    contentFormat: z.coerce.number(),
    contentTrust: z.coerce.number(),
    example: z.coerce.number(),
    feedbackAuthorFormat: z.coerce.number(),
    grade: z.coerce.number(),
    gradeOver: z.coerce.number(),
    late: z.coerce.number(),
    published: z.coerce.boolean(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const workshopSubmissionIdSchema = baseSchema.pick({ id: true });

// Types for workshopSubmissions - used to type API request params and within Components
export type WorkshopSubmission = typeof workshopSubmissions.$inferSelect;
export type NewWorkshopSubmission = z.infer<
  typeof insertWorkshopSubmissionSchema
>;
export type NewWorkshopSubmissionParams = z.infer<
  typeof insertWorkshopSubmissionParams
>;
export type UpdateWorkshopSubmissionParams = z.infer<
  typeof updateWorkshopSubmissionParams
>;
export type WorkshopSubmissionId = z.infer<
  typeof workshopSubmissionIdSchema
>["id"];

// this type infers the return from getWorkshopSubmissions() - meaning it will include any joins
export type CompleteWorkshopSubmission = Awaited<
  ReturnType<typeof getWorkshopSubmissions>
>["workshopSubmissions"][number];
