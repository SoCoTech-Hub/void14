import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getAnalyticsUsedFiles } from "@/lib/api/analyticsUsedFiles/queries";

import { nanoid } from "@/lib/utils";


export const analyticsUsedFiles = pgTable('analytics_used_files', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  action: varchar("action", { length: 256 }),
  fileId: varchar("file_id", { length: 256 }),
  modelId: varchar("model_id", { length: 256 }),
  time: timestamp("time")
}, (analyticsUsedFiles) => {
  return {
    fileIdIndex: uniqueIndex('file_id_idx').on(analyticsUsedFiles.fileId),
  }
});


// Schema for analyticsUsedFiles - used to validate API requests
const baseSchema = createSelectSchema(analyticsUsedFiles)

export const insertAnalyticsUsedFileSchema = createInsertSchema(analyticsUsedFiles);
export const insertAnalyticsUsedFileParams = baseSchema.extend({
  time: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateAnalyticsUsedFileSchema = baseSchema;
export const updateAnalyticsUsedFileParams = baseSchema.extend({
  time: z.coerce.string().min(1)
})
export const analyticsUsedFileIdSchema = baseSchema.pick({ id: true });

// Types for analyticsUsedFiles - used to type API request params and within Components
export type AnalyticsUsedFile = typeof analyticsUsedFiles.$inferSelect;
export type NewAnalyticsUsedFile = z.infer<typeof insertAnalyticsUsedFileSchema>;
export type NewAnalyticsUsedFileParams = z.infer<typeof insertAnalyticsUsedFileParams>;
export type UpdateAnalyticsUsedFileParams = z.infer<typeof updateAnalyticsUsedFileParams>;
export type AnalyticsUsedFileId = z.infer<typeof analyticsUsedFileIdSchema>["id"];
    
// this type infers the return from getAnalyticsUsedFiles() - meaning it will include any joins
export type CompleteAnalyticsUsedFile = Awaited<ReturnType<typeof getAnalyticsUsedFiles>>["analyticsUsedFiles"][number];

