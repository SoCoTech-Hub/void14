import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getThemes } from "@/lib/api/themes/queries";

import { nanoid } from "@/lib/utils";


export const themes = pgTable('themes', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  primaryColor: varchar("primary_color", { length: 256 }),
  secondaryColor: varchar("secondary_color", { length: 256 }),
  logo: varchar("logo", { length: 256 }),
  favicon: varchar("favicon", { length: 256 }),
  componentBg: varchar("component_bg", { length: 256 }),
  appBg: varchar("app_bg", { length: 256 }),
  textColor: varchar("text_color", { length: 256 }),
  icon1Color: varchar("icon1_color", { length: 256 }),
  icon2Color: varchar("icon2_color", { length: 256 })
});


// Schema for themes - used to validate API requests
const baseSchema = createSelectSchema(themes)

export const insertThemeSchema = createInsertSchema(themes);
export const insertThemeParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateThemeSchema = baseSchema;
export const updateThemeParams = baseSchema.extend({})
export const themeIdSchema = baseSchema.pick({ id: true });

// Types for themes - used to type API request params and within Components
export type Theme = typeof themes.$inferSelect;
export type NewTheme = z.infer<typeof insertThemeSchema>;
export type NewThemeParams = z.infer<typeof insertThemeParams>;
export type UpdateThemeParams = z.infer<typeof updateThemeParams>;
export type ThemeId = z.infer<typeof themeIdSchema>["id"];
    
// this type infers the return from getThemes() - meaning it will include any joins
export type CompleteTheme = Awaited<ReturnType<typeof getThemes>>["themes"][number];

