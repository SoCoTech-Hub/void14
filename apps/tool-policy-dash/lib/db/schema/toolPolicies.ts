import { varchar, integer, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getToolPolicies } from "@/lib/api/toolPolicies/queries";

import { nanoid } from "@/lib/utils";


export const toolPolicies = pgTable('tool_policies', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  currentVersionId: varchar("current_version_id", { length: 256 }),
  sortOrder: integer("sort_order")
});


// Schema for toolPolicies - used to validate API requests
const baseSchema = createSelectSchema(toolPolicies)

export const insertToolPolicySchema = createInsertSchema(toolPolicies);
export const insertToolPolicyParams = baseSchema.extend({
  sortOrder: z.coerce.number()
}).omit({ 
  id: true
});

export const updateToolPolicySchema = baseSchema;
export const updateToolPolicyParams = baseSchema.extend({
  sortOrder: z.coerce.number()
})
export const toolPolicyIdSchema = baseSchema.pick({ id: true });

// Types for toolPolicies - used to type API request params and within Components
export type ToolPolicy = typeof toolPolicies.$inferSelect;
export type NewToolPolicy = z.infer<typeof insertToolPolicySchema>;
export type NewToolPolicyParams = z.infer<typeof insertToolPolicyParams>;
export type UpdateToolPolicyParams = z.infer<typeof updateToolPolicyParams>;
export type ToolPolicyId = z.infer<typeof toolPolicyIdSchema>["id"];
    
// this type infers the return from getToolPolicies() - meaning it will include any joins
export type CompleteToolPolicy = Awaited<ReturnType<typeof getToolPolicies>>["toolPolicies"][number];

