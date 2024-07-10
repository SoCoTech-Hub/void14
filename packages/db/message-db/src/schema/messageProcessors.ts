import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const messageProcessors = pgTable("message_processors", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  enabled: boolean("enabled"),
  name: varchar("name", { length: 256 }),
});

// Schema for messageProcessors - used to validate API requests
const baseSchema = createSelectSchema(messageProcessors);

export const insertMessageProcessorSchema =
  createInsertSchema(messageProcessors);
export const insertMessageProcessorParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateMessageProcessorSchema = baseSchema;
export const updateMessageProcessorParams = baseSchema.extend({
  enabled: z.coerce.boolean(),
});
export const messageProcessorIdSchema = baseSchema.pick({ id: true });

// Types for messageProcessors - used to type API request params and within Components
export type MessageProcessor = typeof messageProcessors.$inferSelect;
export type NewMessageProcessor = z.infer<typeof insertMessageProcessorSchema>;
export type NewMessageProcessorParams = z.infer<
  typeof insertMessageProcessorParams
>;
export type UpdateMessageProcessorParams = z.infer<
  typeof updateMessageProcessorParams
>;
export type MessageProcessorId = z.infer<typeof messageProcessorIdSchema>["id"];
