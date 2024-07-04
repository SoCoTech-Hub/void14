import { sql } from "drizzle-orm";
import {
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

import { type getAnalyticsModelLogs } from "../api/analyticsModelLogs/queries";

export const analyticsModelLogs = pgTable(
  "analytics_model_logs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    dir: text("dir"),
    evaluationMode: varchar("evaluation_mode", { length: 256 }),
    indicators: text("indicators"),
    info: text("info"),
    modelId: varchar("model_id", { length: 256 }),
    score: real("score"),
    target: varchar("target", { length: 256 }),
    timeSplitting: varchar("time_splitting", { length: 256 }),
    version: integer("version"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (analyticsModelLogs) => {
    return {
      modelIdIndex: uniqueIndex("aml_model_id_idx").on(
        analyticsModelLogs.modelId,
      ),
    };
  },
);

// Schema for analyticsModelLogs - used to validate API requests
const baseSchema = createSelectSchema(analyticsModelLogs).omit(timestamps);

export const insertAnalyticsModelLogSchema =
  createInsertSchema(analyticsModelLogs).omit(timestamps);
export const insertAnalyticsModelLogParams = baseSchema
  .extend({
    score: z.coerce.number(),
    version: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAnalyticsModelLogSchema = baseSchema;
export const updateAnalyticsModelLogParams = baseSchema
  .extend({
    score: z.coerce.number(),
    version: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const analyticsModelLogIdSchema = baseSchema.pick({ id: true });

// Types for analyticsModelLogs - used to type API request params and within Components
export type AnalyticsModelLog = typeof analyticsModelLogs.$inferSelect;
export type NewAnalyticsModelLog = z.infer<
  typeof insertAnalyticsModelLogSchema
>;
export type NewAnalyticsModelLogParams = z.infer<
  typeof insertAnalyticsModelLogParams
>;
export type UpdateAnalyticsModelLogParams = z.infer<
  typeof updateAnalyticsModelLogParams
>;
export type AnalyticsModelLogId = z.infer<
  typeof analyticsModelLogIdSchema
>["id"];

// this type infers the return from getAnalyticsModelLogs() - meaning it will include any joins
export type CompleteAnalyticsModelLog = Awaited<
  ReturnType<typeof getAnalyticsModelLogs>
>["analyticsModelLogs"][number];
