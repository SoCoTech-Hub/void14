import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getThemes } from "@/lib/api/themes/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const themes = pgTable('themes', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  organizationId: varchar("organization_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (themes) => {
  return {
    organizationIdIndex: uniqueIndex('organization_id_idx').on(themes.organizationId),
  }
});


// Schema for themes - used to validate API requests
const baseSchema = createSelectSchema(themes).omit(timestamps)

export const insertThemeSchema = createInsertSchema(themes).omit(timestamps);
export const insertThemeParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateThemeSchema = baseSchema;
export const updateThemeParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const themeIdSchema = baseSchema.pick({ id: true });

// Types for themes - used to type API request params and within Components
export type Theme = typeof themes.$inferSelect;
export type NewTheme = z.infer<typeof insertThemeSchema>;
export type NewThemeParams = z.infer<typeof insertThemeParams>;
export type UpdateThemeParams = z.infer<typeof updateThemeParams>;
export type ThemeId = z.infer<typeof themeIdSchema>["id"];
    
// this type infers the return from getThemes() - meaning it will include any joins
export type CompleteTheme = Awaited<ReturnType<typeof getThemes>>["themes"][number];

