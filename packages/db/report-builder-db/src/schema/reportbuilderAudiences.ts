import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const reportbuilderAudiences = pgTable(
  "reportbuilder_audiences",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    className: varchar("class_name", { length: 256 }),
    configData: text("config_data"),
    heading: varchar("heading", { length: 256 }),
    reportId: varchar("report_id", { length: 256 }),
    userModifiedId: varchar("user_modified_id", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (reportbuilderAudiences) => {
    return {
      reportIdIndex: uniqueIndex("report_id_idx").on(
        reportbuilderAudiences.reportId,
      ),
    };
  },
);

// Schema for reportbuilderAudiences - used to validate API requests
const baseSchema = createSelectSchema(reportbuilderAudiences).omit(timestamps);

export const insertReportbuilderAudienceSchema = createInsertSchema(
  reportbuilderAudiences,
).omit(timestamps);
export const insertReportbuilderAudienceParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateReportbuilderAudienceSchema = baseSchema;
export const updateReportbuilderAudienceParams = baseSchema.extend({}).omit({
  userId: true,
});
export const reportbuilderAudienceIdSchema = baseSchema.pick({ id: true });

// Types for reportbuilderAudiences - used to type API request params and within Components
export type ReportbuilderAudience = typeof reportbuilderAudiences.$inferSelect;
export type NewReportbuilderAudience = z.infer<
  typeof insertReportbuilderAudienceSchema
>;
export type NewReportbuilderAudienceParams = z.infer<
  typeof insertReportbuilderAudienceParams
>;
export type UpdateReportbuilderAudienceParams = z.infer<
  typeof updateReportbuilderAudienceParams
>;
export type ReportbuilderAudienceId = z.infer<
  typeof reportbuilderAudienceIdSchema
>["id"];
