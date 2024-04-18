import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getAnalyticsUsedAnalysables } from "@/lib/api/analyticsUsedAnalysables/queries";

import { nanoid } from "@/lib/utils";


export const analyticsUsedAnalysables = pgTable('analytics_used_analysables', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  action: varchar("action", { length: 256 }),
  analysableId: varchar("analysable_id", { length: 256 }),
  firstAnalysis: timestamp("first_analysis"),
  modelId: varchar("model_id", { length: 256 }),
  timeAnalysed: timestamp("time_analysed")
}, (analyticsUsedAnalysables) => {
  return {
    modelIdIndex: uniqueIndex('model_id_idx').on(analyticsUsedAnalysables.modelId),
  }
});


// Schema for analyticsUsedAnalysables - used to validate API requests
const baseSchema = createSelectSchema(analyticsUsedAnalysables)

export const insertAnalyticsUsedAnalysableSchema = createInsertSchema(analyticsUsedAnalysables);
export const insertAnalyticsUsedAnalysableParams = baseSchema.extend({
  firstAnalysis: z.coerce.string().min(1),
  timeAnalysed: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateAnalyticsUsedAnalysableSchema = baseSchema;
export const updateAnalyticsUsedAnalysableParams = baseSchema.extend({
  firstAnalysis: z.coerce.string().min(1),
  timeAnalysed: z.coerce.string().min(1)
})
export const analyticsUsedAnalysableIdSchema = baseSchema.pick({ id: true });

// Types for analyticsUsedAnalysables - used to type API request params and within Components
export type AnalyticsUsedAnalysable = typeof analyticsUsedAnalysables.$inferSelect;
export type NewAnalyticsUsedAnalysable = z.infer<typeof insertAnalyticsUsedAnalysableSchema>;
export type NewAnalyticsUsedAnalysableParams = z.infer<typeof insertAnalyticsUsedAnalysableParams>;
export type UpdateAnalyticsUsedAnalysableParams = z.infer<typeof updateAnalyticsUsedAnalysableParams>;
export type AnalyticsUsedAnalysableId = z.infer<typeof analyticsUsedAnalysableIdSchema>["id"];
    
// this type infers the return from getAnalyticsUsedAnalysables() - meaning it will include any joins
export type CompleteAnalyticsUsedAnalysable = Awaited<ReturnType<typeof getAnalyticsUsedAnalysables>>["analyticsUsedAnalysables"][number];

