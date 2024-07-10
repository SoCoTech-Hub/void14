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

export const analyticsPredictSamples = pgTable(
  "analytics_predict_samples",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    analysableId: varchar("analysable_id", { length: 256 }),
    modelId: varchar("model_id", { length: 256 }),
    rangeIndex: varchar("range_index", { length: 256 }),
    sampleIds: text("sample_ids"),
    timeSplitting: varchar("time_splitting", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (analyticsPredictSamples) => {
    return {
      modelIdIndex: uniqueIndex("aps_model_id_idx").on(
        analyticsPredictSamples.modelId,
      ),
    };
  },
);

// Schema for analyticsPredictSamples - used to validate API requests
const baseSchema = createSelectSchema(analyticsPredictSamples).omit(timestamps);

export const insertAnalyticsPredictSampleSchema = createInsertSchema(
  analyticsPredictSamples,
).omit(timestamps);
export const insertAnalyticsPredictSampleParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateAnalyticsPredictSampleSchema = baseSchema;
export const updateAnalyticsPredictSampleParams = baseSchema.extend({});
export const analyticsPredictSampleIdSchema = baseSchema.pick({ id: true });

// Types for analyticsPredictSamples - used to type API request params and within Components
export type AnalyticsPredictSample =
  typeof analyticsPredictSamples.$inferSelect;
export type NewAnalyticsPredictSample = z.infer<
  typeof insertAnalyticsPredictSampleSchema
>;
export type NewAnalyticsPredictSampleParams = z.infer<
  typeof insertAnalyticsPredictSampleParams
>;
export type UpdateAnalyticsPredictSampleParams = z.infer<
  typeof updateAnalyticsPredictSampleParams
>;
export type AnalyticsPredictSampleId = z.infer<
  typeof analyticsPredictSampleIdSchema
>["id"];
