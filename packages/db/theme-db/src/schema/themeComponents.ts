import { type getThemeComponents } from "@/lib/api/themeComponents/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const themeComponents = pgTable("theme_components", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
});

// Schema for themeComponents - used to validate API requests
const baseSchema = createSelectSchema(themeComponents);

export const insertThemeComponentSchema = createInsertSchema(themeComponents);
export const insertThemeComponentParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateThemeComponentSchema = baseSchema;
export const updateThemeComponentParams = baseSchema.extend({});
export const themeComponentIdSchema = baseSchema.pick({ id: true });

// Types for themeComponents - used to type API request params and within Components
export type ThemeComponent = typeof themeComponents.$inferSelect;
export type NewThemeComponent = z.infer<typeof insertThemeComponentSchema>;
export type NewThemeComponentParams = z.infer<
  typeof insertThemeComponentParams
>;
export type UpdateThemeComponentParams = z.infer<
  typeof updateThemeComponentParams
>;
export type ThemeComponentId = z.infer<typeof themeComponentIdSchema>["id"];

// this type infers the return from getThemeComponents() - meaning it will include any joins
export type CompleteThemeComponent = Awaited<
  ReturnType<typeof getThemeComponents>
>["themeComponents"][number];
