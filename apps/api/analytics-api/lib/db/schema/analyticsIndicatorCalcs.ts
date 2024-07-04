import { type getAnalyticsIndicatorCalcs } from "@/lib/api/analyticsIndicatorCalcs/queries";
import { sql } from "drizzle-orm";
import { pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const analyticsIndicatorCalcs = pgTable("analytics_indicator_calcs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  indicator: varchar("indicator", { length: 256 }),
  sampleId: varchar("sample_id", { length: 256 }),
  sampleOrigin: varchar("sample_origin", { length: 256 }),
  value: real("value"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for analyticsIndicatorCalcs - used to validate API requests
const baseSchema = createSelectSchema(analyticsIndicatorCalcs).omit(timestamps);

export const insertAnalyticsIndicatorCalcSchema = createInsertSchema(
  analyticsIndicatorCalcs,
).omit(timestamps);
export const insertAnalyticsIndicatorCalcParams = baseSchema
  .extend({
    startTime: z.coerce.string().min(1),
    endTime: z.coerce.string().min(1),
    value: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateAnalyticsIndicatorCalcSchema = baseSchema;
export const updateAnalyticsIndicatorCalcParams = baseSchema.extend({
  startTime: z.coerce.string().min(1),
  endTime: z.coerce.string().min(1),
  value: z.coerce.number(),
});
export const analyticsIndicatorCalcIdSchema = baseSchema.pick({ id: true });

// Types for analyticsIndicatorCalcs - used to type API request params and within Components
export type AnalyticsIndicatorCalc =
  typeof analyticsIndicatorCalcs.$inferSelect;
export type NewAnalyticsIndicatorCalc = z.infer<
  typeof insertAnalyticsIndicatorCalcSchema
>;
export type NewAnalyticsIndicatorCalcParams = z.infer<
  typeof insertAnalyticsIndicatorCalcParams
>;
export type UpdateAnalyticsIndicatorCalcParams = z.infer<
  typeof updateAnalyticsIndicatorCalcParams
>;
export type AnalyticsIndicatorCalcId = z.infer<
  typeof analyticsIndicatorCalcIdSchema
>["id"];

// this type infers the return from getAnalyticsIndicatorCalcs() - meaning it will include any joins
export type CompleteAnalyticsIndicatorCalc = Awaited<
  ReturnType<typeof getAnalyticsIndicatorCalcs>
>["analyticsIndicatorCalcs"][number];
