
import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const analyticsUsedAnalysables = pgTable(
  "analytics_used_analysables",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    action: varchar("action", { length: 256 }),
    analysableId: varchar("analysable_id", { length: 256 }),
    firstAnalysis: varchar("first_analysis", { length: 256 }),
    modelId: varchar("model_id", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (analyticsUsedAnalysables) => {
    return {
      modelIdIndex: uniqueIndex("aua_model_id_idx").on(
        analyticsUsedAnalysables.modelId,
      ),
    };
  },
);

// Schema for analyticsUsedAnalysables - used to validate API requests
const baseSchema = createSelectSchema(analyticsUsedAnalysables).omit(
  timestamps,
);

export const insertAnalyticsUsedAnalysableSchema = createInsertSchema(
  analyticsUsedAnalysables,
).omit(timestamps);
export const insertAnalyticsUsedAnalysableParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateAnalyticsUsedAnalysableSchema = baseSchema;
export const updateAnalyticsUsedAnalysableParams = baseSchema.extend({});
export const analyticsUsedAnalysableIdSchema = baseSchema.pick({ id: true });

// Types for analyticsUsedAnalysables - used to type API request params and within Components
export type AnalyticsUsedAnalysable =
  typeof analyticsUsedAnalysables.$inferSelect;
export type NewAnalyticsUsedAnalysable = z.infer<
  typeof insertAnalyticsUsedAnalysableSchema
>;
export type NewAnalyticsUsedAnalysableParams = z.infer<
  typeof insertAnalyticsUsedAnalysableParams
>;
export type UpdateAnalyticsUsedAnalysableParams = z.infer<
  typeof updateAnalyticsUsedAnalysableParams
>;
export type AnalyticsUsedAnalysableId = z.infer<
  typeof analyticsUsedAnalysableIdSchema
>["id"];


