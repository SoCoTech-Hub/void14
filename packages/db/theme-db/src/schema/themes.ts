import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const themes = pgTable(
  "themes",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (themes) => {
    return {
      organizationIdIndex: uniqueIndex("organization_id_idx").on(
        themes.organizationId,
      ),
    };
  },
);

// Schema for themes - used to validate API requests
const baseSchema = createSelectSchema(themes).omit(timestamps);

export const insertThemeSchema = createInsertSchema(themes).omit(timestamps);
export const insertThemeParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateThemeSchema = baseSchema;
export const updateThemeParams = baseSchema.extend({}).omit({
  userId: true,
});
export const themeIdSchema = baseSchema.pick({ id: true });

// Types for themes - used to type API request params and within Components
export type Theme = typeof themes.$inferSelect;
export type NewTheme = z.infer<typeof insertThemeSchema>;
export type NewThemeParams = z.infer<typeof insertThemeParams>;
export type UpdateThemeParams = z.infer<typeof updateThemeParams>;
export type ThemeId = z.infer<typeof themeIdSchema>["id"];
