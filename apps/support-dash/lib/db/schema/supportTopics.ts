import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { supportDepartments } from "./supportDepartments"
import { type getSupportTopics } from "@/lib/api/supportTopics/queries";

import { nanoid } from "@/lib/utils";


export const supportTopics = pgTable('support_topics', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  supportDepartmentId: varchar("support_department_id", { length: 256 }).references(() => supportDepartments.id, { onDelete: "cascade" }).notNull()
});


// Schema for supportTopics - used to validate API requests
const baseSchema = createSelectSchema(supportTopics)

export const insertSupportTopicSchema = createInsertSchema(supportTopics);
export const insertSupportTopicParams = baseSchema.extend({
  supportDepartmentId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateSupportTopicSchema = baseSchema;
export const updateSupportTopicParams = baseSchema.extend({
  supportDepartmentId: z.coerce.string().min(1)
})
export const supportTopicIdSchema = baseSchema.pick({ id: true });

// Types for supportTopics - used to type API request params and within Components
export type SupportTopic = typeof supportTopics.$inferSelect;
export type NewSupportTopic = z.infer<typeof insertSupportTopicSchema>;
export type NewSupportTopicParams = z.infer<typeof insertSupportTopicParams>;
export type UpdateSupportTopicParams = z.infer<typeof updateSupportTopicParams>;
export type SupportTopicId = z.infer<typeof supportTopicIdSchema>["id"];
    
// this type infers the return from getSupportTopics() - meaning it will include any joins
export type CompleteSupportTopic = Awaited<ReturnType<typeof getSupportTopics>>["supportTopics"][number];

