import { varchar, boolean, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMnetServices } from "@/lib/api/mnetServices/queries";

import { nanoid } from "@/lib/utils";


export const mnetServices = pgTable('mnet_services', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  apiVersion: varchar("api_version", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  name: varchar("name", { length: 256 }).notNull(),
  offer: boolean("offer").notNull()
}, (mnetServices) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(mnetServices.name),
  }
});


// Schema for mnetServices - used to validate API requests
const baseSchema = createSelectSchema(mnetServices)

export const insertMnetServiceSchema = createInsertSchema(mnetServices);
export const insertMnetServiceParams = baseSchema.extend({
  offer: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateMnetServiceSchema = baseSchema;
export const updateMnetServiceParams = baseSchema.extend({
  offer: z.coerce.boolean()
})
export const mnetServiceIdSchema = baseSchema.pick({ id: true });

// Types for mnetServices - used to type API request params and within Components
export type MnetService = typeof mnetServices.$inferSelect;
export type NewMnetService = z.infer<typeof insertMnetServiceSchema>;
export type NewMnetServiceParams = z.infer<typeof insertMnetServiceParams>;
export type UpdateMnetServiceParams = z.infer<typeof updateMnetServiceParams>;
export type MnetServiceId = z.infer<typeof mnetServiceIdSchema>["id"];
    
// this type infers the return from getMnetServices() - meaning it will include any joins
export type CompleteMnetService = Awaited<ReturnType<typeof getMnetServices>>["mnetServices"][number];

