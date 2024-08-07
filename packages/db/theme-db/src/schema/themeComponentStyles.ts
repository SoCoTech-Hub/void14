import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { themeComponents } from "./themeComponents";
import { themes } from "./themes";

export const themeComponentStyles = pgTable(
  "theme_component_styles",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    themeId: varchar("theme_id", { length: 256 })
      .references(() => themes.id, { onDelete: "cascade" })
      .notNull(),
    themeComponentId: varchar("theme_component_id", { length: 256 })
      .references(() => themeComponents.id, { onDelete: "cascade" })
      .notNull(),
    style: text("style"),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (themeComponentStyles) => {
    return {
      themeIdIndex: uniqueIndex("theme_id_idx").on(
        themeComponentStyles.themeId,
      ),
    };
  },
);

// Schema for themeComponentStyles - used to validate API requests
const baseSchema = createSelectSchema(themeComponentStyles).omit(timestamps);

export const insertThemeComponentStyleSchema =
  createInsertSchema(themeComponentStyles).omit(timestamps);
export const insertThemeComponentStyleParams = baseSchema
  .extend({
    themeId: z.coerce.string().min(1),
    themeComponentId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateThemeComponentStyleSchema = baseSchema;
export const updateThemeComponentStyleParams = baseSchema
  .extend({
    themeId: z.coerce.string().min(1),
    themeComponentId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const themeComponentStyleIdSchema = baseSchema.pick({ id: true });

// Types for themeComponentStyles - used to type API request params and within Components
export type ThemeComponentStyle = typeof themeComponentStyles.$inferSelect;
export type NewThemeComponentStyle = z.infer<
  typeof insertThemeComponentStyleSchema
>;
export type NewThemeComponentStyleParams = z.infer<
  typeof insertThemeComponentStyleParams
>;
export type UpdateThemeComponentStyleParams = z.infer<
  typeof updateThemeComponentStyleParams
>;
export type ThemeComponentStyleId = z.infer<
  typeof themeComponentStyleIdSchema
>["id"];
