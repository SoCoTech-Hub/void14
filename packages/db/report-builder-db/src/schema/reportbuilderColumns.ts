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

export const reportbuilderColumns = pgTable(
  "reportbuilder_columns",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    aggregation: varchar("aggregation", { length: 256 }),
    columnOrder: integer("column_order"),
    heading: varchar("heading", { length: 256 }),
    reportId: varchar("report_id", { length: 256 }),
    uniqueIdentifier: varchar("unique_identifier", { length: 256 }),
    sortDirection: boolean("sort_direction").default(false),
    sortEnabled: boolean("sort_enabled").default(false),
    sortOrder: integer("sort_order"),
    userModified: varchar("user_modified", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (reportbuilderColumns) => {
    return {
      reportIdIndex: uniqueIndex("report_id_idx").on(
        reportbuilderColumns.reportId,
      ),
    };
  },
);

// Schema for reportbuilderColumns - used to validate API requests
const baseSchema = createSelectSchema(reportbuilderColumns).omit(timestamps);

export const insertReportbuilderColumnSchema =
  createInsertSchema(reportbuilderColumns).omit(timestamps);
export const insertReportbuilderColumnParams = baseSchema
  .extend({
    columnOrder: z.coerce.number(),
    sortDirection: z.coerce.boolean(),
    sortEnabled: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateReportbuilderColumnSchema = baseSchema;
export const updateReportbuilderColumnParams = baseSchema
  .extend({
    columnOrder: z.coerce.number(),
    sortDirection: z.coerce.boolean(),
    sortEnabled: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const reportbuilderColumnIdSchema = baseSchema.pick({ id: true });

// Types for reportbuilderColumns - used to type API request params and within Components
export type ReportbuilderColumn = typeof reportbuilderColumns.$inferSelect;
export type NewReportbuilderColumn = z.infer<
  typeof insertReportbuilderColumnSchema
>;
export type NewReportbuilderColumnParams = z.infer<
  typeof insertReportbuilderColumnParams
>;
export type UpdateReportbuilderColumnParams = z.infer<
  typeof updateReportbuilderColumnParams
>;
export type ReportbuilderColumnId = z.infer<
  typeof reportbuilderColumnIdSchema
>["id"];

