import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getUserPreferences } from "@/lib/api/userPreferences/queries";

import { nanoid } from "@/lib/utils";


export const userPreferences = pgTable('user_preferences', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  value: varchar("value", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull()
});


// Schema for userPreferences - used to validate API requests
const baseSchema = createSelectSchema(userPreferences)

export const insertUserPreferenceSchema = createInsertSchema(userPreferences);
export const insertUserPreferenceParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateUserPreferenceSchema = baseSchema;
export const updateUserPreferenceParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const userPreferenceIdSchema = baseSchema.pick({ id: true });

// Types for userPreferences - used to type API request params and within Components
export type UserPreference = typeof userPreferences.$inferSelect;
export type NewUserPreference = z.infer<typeof insertUserPreferenceSchema>;
export type NewUserPreferenceParams = z.infer<typeof insertUserPreferenceParams>;
export type UpdateUserPreferenceParams = z.infer<typeof updateUserPreferenceParams>;
export type UserPreferenceId = z.infer<typeof userPreferenceIdSchema>["id"];
    
// this type infers the return from getUserPreferences() - meaning it will include any joins
export type CompleteUserPreference = Awaited<ReturnType<typeof getUserPreferences>>["userPreferences"][number];

