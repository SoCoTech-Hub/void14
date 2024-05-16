import { varchar, integer, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { contexts } from "./contexts"
import { type getContextTemp } from "@/lib/api/contextTemp/queries";

import { nanoid } from "@/lib/utils";


export const contextTemp = pgTable('context_temp', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }).references(() => contexts.id, { onDelete: "cascade" }).notNull(),
  depth: integer("depth"),
  locked: integer("locked"),
  path: varchar("path", { length: 256 })
});


// Schema for contextTemp - used to validate API requests
const baseSchema = createSelectSchema(contextTemp)

export const insertContextTempSchema = createInsertSchema(contextTemp);
export const insertContextTempParams = baseSchema.extend({
  contextId: z.coerce.string().min(1),
  depth: z.coerce.number(),
  locked: z.coerce.number()
}).omit({ 
  id: true
});

export const updateContextTempSchema = baseSchema;
export const updateContextTempParams = baseSchema.extend({
  contextId: z.coerce.string().min(1),
  depth: z.coerce.number(),
  locked: z.coerce.number()
})
export const contextTempIdSchema = baseSchema.pick({ id: true });

// Types for contextTemp - used to type API request params and within Components
export type ContextTemp = typeof contextTemp.$inferSelect;
export type NewContextTemp = z.infer<typeof insertContextTempSchema>;
export type NewContextTempParams = z.infer<typeof insertContextTempParams>;
export type UpdateContextTempParams = z.infer<typeof updateContextTempParams>;
export type ContextTempId = z.infer<typeof contextTempIdSchema>["id"];
    
// this type infers the return from getContextTemp() - meaning it will include any joins
export type CompleteContextTemp = Awaited<ReturnType<typeof getContextTemp>>["contextTemp"][number];

