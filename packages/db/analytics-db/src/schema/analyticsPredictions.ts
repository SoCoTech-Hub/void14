
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

export const analyticsPredictions = pgTable(
  "analytics_predictions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    calculations: text("calculations"),
    contextId: varchar("context_id", { length: 256 }),
    modelId: varchar("model_id", { length: 256 }),
    prediciton: real("prediciton"),
    predicitonScore: real("prediciton_score"),
    rangeIndex: integer("range_index"),
    sampleId: varchar("sample_id", { length: 256 }),
    startTime: timestamp("start_time"),
    endTime: timestamp("end_time"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (analyticsPredictions) => {
    return {
      modelIdIndex: uniqueIndex("ap_model_id_idx").on(
        analyticsPredictions.modelId,
      ),
    };
  },
);

// Schema for analyticsPredictions - used to validate API requests
const baseSchema = createSelectSchema(analyticsPredictions).omit(timestamps);

export const insertAnalyticsPredictionSchema =
  createInsertSchema(analyticsPredictions).omit(timestamps);
export const insertAnalyticsPredictionParams = baseSchema
  .extend({
    prediciton: z.coerce.number(),
    predicitonScore: z.coerce.number(),
    rangeIndex: z.coerce.number(),
    startTime: z.coerce.string().min(1),
    endTime: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateAnalyticsPredictionSchema = baseSchema;
export const updateAnalyticsPredictionParams = baseSchema.extend({
  prediciton: z.coerce.number(),
  predicitonScore: z.coerce.number(),
  rangeIndex: z.coerce.number(),
  startTime: z.coerce.string().min(1),
  endTime: z.coerce.string().min(1),
});
export const analyticsPredictionIdSchema = baseSchema.pick({ id: true });

// Types for analyticsPredictions - used to type API request params and within Components
export type AnalyticsPrediction = typeof analyticsPredictions.$inferSelect;
export type NewAnalyticsPrediction = z.infer<
  typeof insertAnalyticsPredictionSchema
>;
export type NewAnalyticsPredictionParams = z.infer<
  typeof insertAnalyticsPredictionParams
>;
export type UpdateAnalyticsPredictionParams = z.infer<
  typeof updateAnalyticsPredictionParams
>;
export type AnalyticsPredictionId = z.infer<
  typeof analyticsPredictionIdSchema
>["id"];

