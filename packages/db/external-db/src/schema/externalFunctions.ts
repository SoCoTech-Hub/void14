import { type getExternalFunctions } from "@/lib/api/externalFunctions/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const externalFunctions = pgTable("external_functions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  capabilities: varchar("capabilities", { length: 256 }),
  className: varchar("class_name", { length: 256 }),
  classPath: varchar("class_path", { length: 256 }),
  component: varchar("component", { length: 256 }),
  methodName: varchar("method_name", { length: 256 }),
  name: varchar("name", { length: 256 }),
  services: varchar("services", { length: 256 }),
});

// Schema for externalFunctions - used to validate API requests
const baseSchema = createSelectSchema(externalFunctions);

export const insertExternalFunctionSchema =
  createInsertSchema(externalFunctions);
export const insertExternalFunctionParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateExternalFunctionSchema = baseSchema;
export const updateExternalFunctionParams = baseSchema.extend({});
export const externalFunctionIdSchema = baseSchema.pick({ id: true });

// Types for externalFunctions - used to type API request params and within Components
export type ExternalFunction = typeof externalFunctions.$inferSelect;
export type NewExternalFunction = z.infer<typeof insertExternalFunctionSchema>;
export type NewExternalFunctionParams = z.infer<
  typeof insertExternalFunctionParams
>;
export type UpdateExternalFunctionParams = z.infer<
  typeof updateExternalFunctionParams
>;
export type ExternalFunctionId = z.infer<typeof externalFunctionIdSchema>["id"];

// this type infers the return from getExternalFunctions() - meaning it will include any joins
export type CompleteExternalFunction = Awaited<
  ReturnType<typeof getExternalFunctions>
>["externalFunctions"][number];
