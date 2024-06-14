import { sql } from "drizzle-orm";
import { varchar, text, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getToolCustomLangs } from "@/lib/api/toolCustomLangs/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const toolCustomLangs = pgTable('tool_custom_langs', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
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
const baseSchema = createSelectSchema(toolCustomLangs).omit(timestamps)

export const insertToolCustomLangSchema = createInsertSchema(toolCustomLangs).omit(timestamps);
export const insertToolCustomLangParams = baseSchema.extend({
  modified: z.coerce.number(),
  outdated: z.coerce.number(),
  customizedAt: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateToolCustomLangSchema = baseSchema;
export const updateToolCustomLangParams = baseSchema.extend({
  modified: z.coerce.number(),
  outdated: z.coerce.number(),
  customizedAt: z.coerce.string().min(1)
})
export const toolCustomLangIdSchema = baseSchema.pick({ id: true });

// Types for toolCustomLangs - used to type API request params and within Components
export type ToolCustomLang = typeof toolCustomLangs.$inferSelect;
export type NewToolCustomLang = z.infer<typeof insertToolCustomLangSchema>;
export type NewToolCustomLangParams = z.infer<typeof insertToolCustomLangParams>;
export type UpdateToolCustomLangParams = z.infer<typeof updateToolCustomLangParams>;
export type ToolCustomLangId = z.infer<typeof toolCustomLangIdSchema>["id"];
    
// this type infers the return from getToolCustomLangs() - meaning it will include any joins
export type CompleteToolCustomLang = Awaited<ReturnType<typeof getToolCustomLangs>>["toolCustomLangs"][number];

