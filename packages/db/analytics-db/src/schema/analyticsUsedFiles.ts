import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const analyticsUsedFiles = pgTable(
  "analytics_used_files",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    action: varchar("action", { length: 256 }),
    fileId: varchar("file_id", { length: 256 }),
    modelId: varchar("model_id", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (analyticsUsedFiles) => {
    return {
      modelIdIndex: uniqueIndex("auf_model_id_idx").on(
        analyticsUsedFiles.modelId,
      ),
    };
  },
);

// Schema for analyticsUsedFiles - used to validate API requests
const baseSchema = createSelectSchema(analyticsUsedFiles).omit(timestamps);

export const insertAnalyticsUsedFileSchema =
  createInsertSchema(analyticsUsedFiles).omit(timestamps);
export const insertAnalyticsUsedFileParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateAnalyticsUsedFileSchema = baseSchema;
export const updateAnalyticsUsedFileParams = baseSchema.extend({});
export const analyticsUsedFileIdSchema = baseSchema.pick({ id: true });

// Types for analyticsUsedFiles - used to type API request params and within Components
export type AnalyticsUsedFile = typeof analyticsUsedFiles.$inferSelect;
export type NewAnalyticsUsedFile = z.infer<
  typeof insertAnalyticsUsedFileSchema
>;
export type NewAnalyticsUsedFileParams = z.infer<
  typeof insertAnalyticsUsedFileParams
>;
export type UpdateAnalyticsUsedFileParams = z.infer<
  typeof updateAnalyticsUsedFileParams
>;
export type AnalyticsUsedFileId = z.infer<
  typeof analyticsUsedFileIdSchema
>["id"];
