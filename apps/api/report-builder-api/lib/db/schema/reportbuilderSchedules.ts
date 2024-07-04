import { type getReportbuilderSchedules } from "@/lib/api/reportbuilderSchedules/queries";
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

export const reportbuilderSchedules = pgTable(
  "reportbuilder_schedules",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    audiences: text("audiences"),
    enabled: boolean("enabled"),
    format: varchar("format", { length: 256 }),
    message: text("message"),
    messageFormat: integer("message_format"),
    name: varchar("name", { length: 256 }),
    recurrence: integer("recurrence"),
    reportEmpty: boolean("report_empty"),
    reportId: varchar("report_id", { length: 256 }).notNull(),
    subject: varchar("subject", { length: 256 }),
    timeLastSent: timestamp("time_last_sent"),
    timeNextSend: timestamp("time_next_send"),
    timeScheduled: timestamp("time_scheduled"),
    userModified: varchar("user_modified", { length: 256 }).notNull(),
    userViewAs: varchar("user_view_as", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (reportbuilderSchedules) => {
    return {
      reportIdIndex: uniqueIndex("reportbuilder_schedules_report_id_idx").on(
        reportbuilderSchedules.reportId,
      ),
    };
  },
);

// Schema for reportbuilderSchedules - used to validate API requests
const baseSchema = createSelectSchema(reportbuilderSchedules).omit(timestamps);

export const insertReportbuilderScheduleSchema = createInsertSchema(
  reportbuilderSchedules,
).omit(timestamps);
export const insertReportbuilderScheduleParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
    messageFormat: z.coerce.number(),
    recurrence: z.coerce.number(),
    reportEmpty: z.coerce.boolean(),
    timeLastSent: z.coerce.string().min(1),
    timeNextSend: z.coerce.string().min(1),
    timeScheduled: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateReportbuilderScheduleSchema = baseSchema;
export const updateReportbuilderScheduleParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
    messageFormat: z.coerce.number(),
    recurrence: z.coerce.number(),
    reportEmpty: z.coerce.boolean(),
    timeLastSent: z.coerce.string().min(1),
    timeNextSend: z.coerce.string().min(1),
    timeScheduled: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const reportbuilderScheduleIdSchema = baseSchema.pick({ id: true });

// Types for reportbuilderSchedules - used to type API request params and within Components
export type ReportbuilderSchedule = typeof reportbuilderSchedules.$inferSelect;
export type NewReportbuilderSchedule = z.infer<
  typeof insertReportbuilderScheduleSchema
>;
export type NewReportbuilderScheduleParams = z.infer<
  typeof insertReportbuilderScheduleParams
>;
export type UpdateReportbuilderScheduleParams = z.infer<
  typeof updateReportbuilderScheduleParams
>;
export type ReportbuilderScheduleId = z.infer<
  typeof reportbuilderScheduleIdSchema
>["id"];

// this type infers the return from getReportbuilderSchedules() - meaning it will include any joins
export type CompleteReportbuilderSchedule = Awaited<
  ReturnType<typeof getReportbuilderSchedules>
>["reportbuilderSchedules"][number];
