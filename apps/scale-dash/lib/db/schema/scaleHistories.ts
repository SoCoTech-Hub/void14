import { sql } from "drizzle-orm";
import { varchar, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getScaleHistories } from "@/lib/api/scaleHistories/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const scaleHistories = pgTable('scale_histories', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  action: varchar("action", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  loggedUser: varchar("logged_user", { length: 256 }),
  name: varchar("name", { length: 256 }),
  oldId: varchar("old_id", { length: 256 }),
  scale: text("scale"),
  source: varchar("source", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for scaleHistories - used to validate API requests
const baseSchema = createSelectSchema(scaleHistories).omit(timestamps)

export const insertScaleHistorySchema = createInsertSchema(scaleHistories).omit(timestamps);
export const insertScaleHistoryParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateScaleHistorySchema = baseSchema;
export const updateScaleHistoryParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const scaleHistoryIdSchema = baseSchema.pick({ id: true });

// Types for scaleHistories - used to type API request params and within Components
export type ScaleHistory = typeof scaleHistories.$inferSelect;
export type NewScaleHistory = z.infer<typeof insertScaleHistorySchema>;
export type NewScaleHistoryParams = z.infer<typeof insertScaleHistoryParams>;
export type UpdateScaleHistoryParams = z.infer<typeof updateScaleHistoryParams>;
export type ScaleHistoryId = z.infer<typeof scaleHistoryIdSchema>["id"];
    
// this type infers the return from getScaleHistories() - meaning it will include any joins
export type CompleteScaleHistory = Awaited<ReturnType<typeof getScaleHistories>>["scaleHistories"][number];

