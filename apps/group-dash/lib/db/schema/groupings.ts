import { sql } from "drizzle-orm";
import { text, varchar, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getGroupings } from "@/lib/api/groupings/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const groupings = pgTable('groupings', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  configData: text("config_data"),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  idNumber: varchar("id_number", { length: 256 }),
  name: varchar("name", { length: 256 }),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for groupings - used to validate API requests
const baseSchema = createSelectSchema(groupings).omit(timestamps)

export const insertGroupingSchema = createInsertSchema(groupings).omit(timestamps);
export const insertGroupingParams = baseSchema.extend({
  descriptionFormat: z.coerce.number()
}).omit({ 
  id: true
});

export const updateGroupingSchema = baseSchema;
export const updateGroupingParams = baseSchema.extend({
  descriptionFormat: z.coerce.number()
})
export const groupingIdSchema = baseSchema.pick({ id: true });

// Types for groupings - used to type API request params and within Components
export type Grouping = typeof groupings.$inferSelect;
export type NewGrouping = z.infer<typeof insertGroupingSchema>;
export type NewGroupingParams = z.infer<typeof insertGroupingParams>;
export type UpdateGroupingParams = z.infer<typeof updateGroupingParams>;
export type GroupingId = z.infer<typeof groupingIdSchema>["id"];
    
// this type infers the return from getGroupings() - meaning it will include any joins
export type CompleteGrouping = Awaited<ReturnType<typeof getGroupings>>["groupings"][number];

