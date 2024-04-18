import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getAnalyticsPredictionActions } from "@/lib/api/analyticsPredictionActions/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const analyticsPredictionActions = pgTable('analytics_prediction_actions', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  actionName: varchar("action_name", { length: 256 }),
  predictionId: varchar("prediction_id", { length: 256 }),
  deleteThisItem: varchar("delete_this_item", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for analyticsPredictionActions - used to validate API requests
const baseSchema = createSelectSchema(analyticsPredictionActions).omit(timestamps)

export const insertAnalyticsPredictionActionSchema = createInsertSchema(analyticsPredictionActions).omit(timestamps);
export const insertAnalyticsPredictionActionParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateAnalyticsPredictionActionSchema = baseSchema;
export const updateAnalyticsPredictionActionParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const analyticsPredictionActionIdSchema = baseSchema.pick({ id: true });

// Types for analyticsPredictionActions - used to type API request params and within Components
export type AnalyticsPredictionAction = typeof analyticsPredictionActions.$inferSelect;
export type NewAnalyticsPredictionAction = z.infer<typeof insertAnalyticsPredictionActionSchema>;
export type NewAnalyticsPredictionActionParams = z.infer<typeof insertAnalyticsPredictionActionParams>;
export type UpdateAnalyticsPredictionActionParams = z.infer<typeof updateAnalyticsPredictionActionParams>;
export type AnalyticsPredictionActionId = z.infer<typeof analyticsPredictionActionIdSchema>["id"];
    
// this type infers the return from getAnalyticsPredictionActions() - meaning it will include any joins
export type CompleteAnalyticsPredictionAction = Awaited<ReturnType<typeof getAnalyticsPredictionActions>>["analyticsPredictionActions"][number];

