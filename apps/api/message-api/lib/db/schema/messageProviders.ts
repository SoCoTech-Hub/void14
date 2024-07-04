import { type getMessageProviders } from "@/lib/api/messageProviders/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const messageProviders = pgTable("message_providers", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  capability: varchar("capability", { length: 256 }),
  component: varchar("component", { length: 256 }),
  name: varchar("name", { length: 256 }),
});

// Schema for messageProviders - used to validate API requests
const baseSchema = createSelectSchema(messageProviders);

export const insertMessageProviderSchema = createInsertSchema(messageProviders);
export const insertMessageProviderParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateMessageProviderSchema = baseSchema;
export const updateMessageProviderParams = baseSchema.extend({});
export const messageProviderIdSchema = baseSchema.pick({ id: true });

// Types for messageProviders - used to type API request params and within Components
export type MessageProvider = typeof messageProviders.$inferSelect;
export type NewMessageProvider = z.infer<typeof insertMessageProviderSchema>;
export type NewMessageProviderParams = z.infer<
  typeof insertMessageProviderParams
>;
export type UpdateMessageProviderParams = z.infer<
  typeof updateMessageProviderParams
>;
export type MessageProviderId = z.infer<typeof messageProviderIdSchema>["id"];

// this type infers the return from getMessageProviders() - meaning it will include any joins
export type CompleteMessageProvider = Awaited<
  ReturnType<typeof getMessageProviders>
>["messageProviders"][number];
