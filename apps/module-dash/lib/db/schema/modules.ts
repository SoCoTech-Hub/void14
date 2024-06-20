import { integer, timestamp, varchar, boolean, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getModules } from "@/lib/api/modules/queries";

import { nanoid } from "@/lib/utils";


export const modules = pgTable('modules', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  cron: integer("cron"),
  lastCron: timestamp("last_cron"),
  name: varchar("name", { length: 256 }),
  search: varchar("search", { length: 256 }).notNull(),
  visible: boolean("visible").notNull()
}, (modules) => {
  return {
    cronIndex: uniqueIndex('cron_idx').on(modules.cron),
  }
});


// Schema for modules - used to validate API requests
const baseSchema = createSelectSchema(modules)

export const insertModuleSchema = createInsertSchema(modules);
export const insertModuleParams = baseSchema.extend({
  cron: z.coerce.number(),
  lastCron: z.coerce.string().min(1),
  visible: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateModuleSchema = baseSchema;
export const updateModuleParams = baseSchema.extend({
  cron: z.coerce.number(),
  lastCron: z.coerce.string().min(1),
  visible: z.coerce.boolean()
})
export const moduleIdSchema = baseSchema.pick({ id: true });

// Types for modules - used to type API request params and within Components
export type Module = typeof modules.$inferSelect;
export type NewModule = z.infer<typeof insertModuleSchema>;
export type NewModuleParams = z.infer<typeof insertModuleParams>;
export type UpdateModuleParams = z.infer<typeof updateModuleParams>;
export type ModuleId = z.infer<typeof moduleIdSchema>["id"];
    
// this type infers the return from getModules() - meaning it will include any joins
export type CompleteModule = Awaited<ReturnType<typeof getModules>>["modules"][number];

