import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const toolCustomLangs = pgTable("tool_custom_langs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  componentId: varchar("component_id", { length: 256 }),
  lang: varchar("lang", { length: 256 }),
  local: text("local"),
  master: text("master"),
  modified: integer("modified"),
  original: text("original"),
  outdated: integer("outdated"),
  stringId: varchar("string_id", { length: 256 }),
  customizedAt: timestamp("customized_at"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolCustomLangs - used to validate API requests
const baseSchema = createSelectSchema(toolCustomLangs).omit(timestamps);

export const insertToolCustomLangSchema =
  createInsertSchema(toolCustomLangs).omit(timestamps);
export const insertToolCustomLangParams = baseSchema
  .extend({
    modified: z.coerce.number(),
    outdated: z.coerce.number(),
    customizedAt: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateToolCustomLangSchema = baseSchema;
export const updateToolCustomLangParams = baseSchema.extend({
  modified: z.coerce.number(),
  outdated: z.coerce.number(),
  customizedAt: z.coerce.string().min(1),
});
export const toolCustomLangIdSchema = baseSchema.pick({ id: true });

// Types for toolCustomLangs - used to type API request params and within Components
export type ToolCustomLang = typeof toolCustomLangs.$inferSelect;
export type NewToolCustomLang = z.infer<typeof insertToolCustomLangSchema>;
export type NewToolCustomLangParams = z.infer<
  typeof insertToolCustomLangParams
>;
export type UpdateToolCustomLangParams = z.infer<
  typeof updateToolCustomLangParams
>;
export type ToolCustomLangId = z.infer<typeof toolCustomLangIdSchema>["id"];
