import { varchar, timestamp, boolean, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMessageinboundHandlers } from "@/lib/api/messageinboundHandlers/queries";

import { nanoid } from "@/lib/utils";


export const messageinboundHandlers = pgTable('messageinbound_handlers', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  className: varchar("class_name", { length: 256 }),
  component: varchar("component", { length: 256 }),
  defaultExpiration: timestamp("default_expiration"),
  enabled: boolean("enabled"),
  validateAddress: boolean("validate_address")
});


// Schema for messageinboundHandlers - used to validate API requests
const baseSchema = createSelectSchema(messageinboundHandlers)

export const insertMessageinboundHandlerSchema = createInsertSchema(messageinboundHandlers);
export const insertMessageinboundHandlerParams = baseSchema.extend({
  defaultExpiration: z.coerce.string().min(1),
  enabled: z.coerce.boolean(),
  validateAddress: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateMessageinboundHandlerSchema = baseSchema;
export const updateMessageinboundHandlerParams = baseSchema.extend({
  defaultExpiration: z.coerce.string().min(1),
  enabled: z.coerce.boolean(),
  validateAddress: z.coerce.boolean()
})
export const messageinboundHandlerIdSchema = baseSchema.pick({ id: true });

// Types for messageinboundHandlers - used to type API request params and within Components
export type MessageinboundHandler = typeof messageinboundHandlers.$inferSelect;
export type NewMessageinboundHandler = z.infer<typeof insertMessageinboundHandlerSchema>;
export type NewMessageinboundHandlerParams = z.infer<typeof insertMessageinboundHandlerParams>;
export type UpdateMessageinboundHandlerParams = z.infer<typeof updateMessageinboundHandlerParams>;
export type MessageinboundHandlerId = z.infer<typeof messageinboundHandlerIdSchema>["id"];
    
// this type infers the return from getMessageinboundHandlers() - meaning it will include any joins
export type CompleteMessageinboundHandler = Awaited<ReturnType<typeof getMessageinboundHandlers>>["messageinboundHandlers"][number];

