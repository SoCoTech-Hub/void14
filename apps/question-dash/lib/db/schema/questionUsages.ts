import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getQuestionUsages } from "@/lib/api/questionUsages/queries";

import { nanoid } from "@/lib/utils";


export const questionUsages = pgTable('question_usages', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }).notNull(),
  preferredBehaviour: varchar("preferred_behaviour", { length: 256 })
}, (questionUsages) => {
  return {
    componentIndex: uniqueIndex('component_idx').on(questionUsages.component),
  }
});


// Schema for questionUsages - used to validate API requests
const baseSchema = createSelectSchema(questionUsages)

export const insertQuestionUsageSchema = createInsertSchema(questionUsages);
export const insertQuestionUsageParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateQuestionUsageSchema = baseSchema;
export const updateQuestionUsageParams = baseSchema.extend({})
export const questionUsageIdSchema = baseSchema.pick({ id: true });

// Types for questionUsages - used to type API request params and within Components
export type QuestionUsage = typeof questionUsages.$inferSelect;
export type NewQuestionUsage = z.infer<typeof insertQuestionUsageSchema>;
export type NewQuestionUsageParams = z.infer<typeof insertQuestionUsageParams>;
export type UpdateQuestionUsageParams = z.infer<typeof updateQuestionUsageParams>;
export type QuestionUsageId = z.infer<typeof questionUsageIdSchema>["id"];
    
// this type infers the return from getQuestionUsages() - meaning it will include any joins
export type CompleteQuestionUsage = Awaited<ReturnType<typeof getQuestionUsages>>["questionUsages"][number];

