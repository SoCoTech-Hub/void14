import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getAnalyticsModels } from "../../api/analyticsModels/queries";

export const analyticsModels = pgTable("analytics_models", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextIds: text("context_ids"),
  isEnabled: boolean("is_enabled"),
  indicators: text("indicators"),
  name: varchar("name", { length: 256 }),
  predictionsProcessor: varchar("predictions_processor", { length: 256 }),
  target: varchar("target", { length: 256 }),
  timeSplitting: varchar("time_splitting", { length: 256 }),
  isTrained: boolean("is_trained"),
  version: integer("version"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for analyticsModels - used to validate API requests
const baseSchema = createSelectSchema(analyticsModels).omit(timestamps);

export const insertAnalyticsModelSchema =
  createInsertSchema(analyticsModels).omit(timestamps);
export const insertAnalyticsModelParams = baseSchema
  .extend({
    isEnabled: z.coerce.boolean(),
    isTrained: z.coerce.boolean(),
    version: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAnalyticsModelSchema = baseSchema;
export const updateAnalyticsModelParams = baseSchema
  .extend({
    isEnabled: z.coerce.boolean(),
    isTrained: z.coerce.boolean(),
    version: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const analyticsModelIdSchema = baseSchema.pick({ id: true });

// Types for analyticsModels - used to type API request params and within Components
export type AnalyticsModel = typeof analyticsModels.$inferSelect;
export type NewAnalyticsModel = z.infer<typeof insertAnalyticsModelSchema>;
export type NewAnalyticsModelParams = z.infer<
  typeof insertAnalyticsModelParams
>;
export type UpdateAnalyticsModelParams = z.infer<
  typeof updateAnalyticsModelParams
>;
export type AnalyticsModelId = z.infer<typeof analyticsModelIdSchema>["id"];

// this type infers the return from getAnalyticsModels() - meaning it will include any joins
export type CompleteAnalyticsModel = Awaited<
  ReturnType<typeof getAnalyticsModels>
>["analyticsModels"][number];
