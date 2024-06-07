import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getExternalServicesFunctions } from "@/lib/api/externalServicesFunctions/queries";

import { nanoid } from "@/lib/utils";


export const externalServicesFunctions = pgTable('external_services_functions', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  externalServiceId: varchar("external_service_id", { length: 256 }),
  functionName: varchar("function_name", { length: 256 })
});


// Schema for externalServicesFunctions - used to validate API requests
const baseSchema = createSelectSchema(externalServicesFunctions)

export const insertExternalServicesFunctionSchema = createInsertSchema(externalServicesFunctions);
export const insertExternalServicesFunctionParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateExternalServicesFunctionSchema = baseSchema;
export const updateExternalServicesFunctionParams = baseSchema.extend({})
export const externalServicesFunctionIdSchema = baseSchema.pick({ id: true });

// Types for externalServicesFunctions - used to type API request params and within Components
export type ExternalServicesFunction = typeof externalServicesFunctions.$inferSelect;
export type NewExternalServicesFunction = z.infer<typeof insertExternalServicesFunctionSchema>;
export type NewExternalServicesFunctionParams = z.infer<typeof insertExternalServicesFunctionParams>;
export type UpdateExternalServicesFunctionParams = z.infer<typeof updateExternalServicesFunctionParams>;
export type ExternalServicesFunctionId = z.infer<typeof externalServicesFunctionIdSchema>["id"];
    
// this type infers the return from getExternalServicesFunctions() - meaning it will include any joins
export type CompleteExternalServicesFunction = Awaited<ReturnType<typeof getExternalServicesFunctions>>["externalServicesFunctions"][number];

