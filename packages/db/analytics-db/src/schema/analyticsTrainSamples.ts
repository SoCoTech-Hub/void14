
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

import { nanoid, timestamps } from "@soco/utils";

export const analyticsTrainSamples = pgTable(
  "analytics_train_samples",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    analysableId: varchar("analysable_id", { length: 256 }),
    modelId: varchar("model_id", { length: 256 }),
    sampleIds: text("sample_ids"),
    timeSplitting: varchar("time_splitting", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (analyticsTrainSamples) => {
    return {
      modelIdIndex: uniqueIndex("ats_model_id_idx").on(
        analyticsTrainSamples.modelId,
      ),
    };
  },
);

// Schema for analyticsTrainSamples - used to validate API requests
const baseSchema = createSelectSchema(analyticsTrainSamples).omit(timestamps);

export const insertAnalyticsTrainSampleSchema = createInsertSchema(
  analyticsTrainSamples,
).omit(timestamps);
export const insertAnalyticsTrainSampleParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateAnalyticsTrainSampleSchema = baseSchema;
export const updateAnalyticsTrainSampleParams = baseSchema.extend({});
export const analyticsTrainSampleIdSchema = baseSchema.pick({ id: true });

// Types for analyticsTrainSamples - used to type API request params and within Components
export type AnalyticsTrainSample = typeof analyticsTrainSamples.$inferSelect;
export type NewAnalyticsTrainSample = z.infer<
  typeof insertAnalyticsTrainSampleSchema
>;
export type NewAnalyticsTrainSampleParams = z.infer<
  typeof insertAnalyticsTrainSampleParams
>;
export type UpdateAnalyticsTrainSampleParams = z.infer<
  typeof updateAnalyticsTrainSampleParams
>;
export type AnalyticsTrainSampleId = z.infer<
  typeof analyticsTrainSampleIdSchema
>["id"];


