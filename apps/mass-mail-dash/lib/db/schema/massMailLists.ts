import { sql } from "drizzle-orm";
import { varchar, boolean, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMassMailLists } from "@/lib/api/massMailLists/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const massMailLists = pgTable('mass_mail_lists', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  isPublic: boolean("is_public"),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for massMailLists - used to validate API requests
const baseSchema = createSelectSchema(massMailLists).omit(timestamps)

export const insertMassMailListSchema = createInsertSchema(massMailLists).omit(timestamps);
export const insertMassMailListParams = baseSchema.extend({
  isPublic: z.coerce.boolean()
}).omit({ 
  id: true,
  userId: true
});

export const updateMassMailListSchema = baseSchema;
export const updateMassMailListParams = baseSchema.extend({
  isPublic: z.coerce.boolean()
}).omit({ 
  userId: true
});
export const massMailListIdSchema = baseSchema.pick({ id: true });

// Types for massMailLists - used to type API request params and within Components
export type MassMailList = typeof massMailLists.$inferSelect;
export type NewMassMailList = z.infer<typeof insertMassMailListSchema>;
export type NewMassMailListParams = z.infer<typeof insertMassMailListParams>;
export type UpdateMassMailListParams = z.infer<typeof updateMassMailListParams>;
export type MassMailListId = z.infer<typeof massMailListIdSchema>["id"];
    
// this type infers the return from getMassMailLists() - meaning it will include any joins
export type CompleteMassMailList = Awaited<ReturnType<typeof getMassMailLists>>["massMailLists"][number];

