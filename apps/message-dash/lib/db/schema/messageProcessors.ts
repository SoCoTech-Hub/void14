import { boolean, varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMessageProcessors } from "@/lib/api/messageProcessors/queries";

import { nanoid } from "@/lib/utils";


export const messageProcessors = pgTable('message_processors', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  enabled: boolean("enabled"),
  name: varchar("name", { length: 256 })
});


// Schema for messageProcessors - used to validate API requests
const baseSchema = createSelectSchema(messageProcessors)

export const insertMessageProcessorSchema = createInsertSchema(messageProcessors);
export const insertMessageProcessorParams = baseSchema.extend({
  enabled: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateMessageProcessorSchema = baseSchema;
export const updateMessageProcessorParams = baseSchema.extend({
  enabled: z.coerce.boolean()
})
export const messageProcessorIdSchema = baseSchema.pick({ id: true });

// Types for messageProcessors - used to type API request params and within Components
export type MessageProcessor = typeof messageProcessors.$inferSelect;
export type NewMessageProcessor = z.infer<typeof insertMessageProcessorSchema>;
export type NewMessageProcessorParams = z.infer<typeof insertMessageProcessorParams>;
export type UpdateMessageProcessorParams = z.infer<typeof updateMessageProcessorParams>;
export type MessageProcessorId = z.infer<typeof messageProcessorIdSchema>["id"];
    
// this type infers the return from getMessageProcessors() - meaning it will include any joins
export type CompleteMessageProcessor = Awaited<ReturnType<typeof getMessageProcessors>>["messageProcessors"][number];

