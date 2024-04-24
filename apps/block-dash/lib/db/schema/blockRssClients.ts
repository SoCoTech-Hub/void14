import { text, varchar, boolean, integer, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getBlockRssClients } from "@/lib/api/blockRssClients/queries";

import { nanoid } from "@/lib/utils";


export const blockRssClients = pgTable('block_rss_clients', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  description: text("description"),
  preferredTitle: varchar("preferred_title", { length: 256 }),
  shared: boolean("shared"),
  skipTime: integer("skip_time"),
  skipUntil: integer("skip_until"),
  title: varchar("title", { length: 256 }),
  url: varchar("url", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull()
});


// Schema for blockRssClients - used to validate API requests
const baseSchema = createSelectSchema(blockRssClients)

export const insertBlockRssClientSchema = createInsertSchema(blockRssClients);
export const insertBlockRssClientParams = baseSchema.extend({
  shared: z.coerce.boolean(),
  skipTime: z.coerce.number(),
  skipUntil: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateBlockRssClientSchema = baseSchema;
export const updateBlockRssClientParams = baseSchema.extend({
  shared: z.coerce.boolean(),
  skipTime: z.coerce.number(),
  skipUntil: z.coerce.number()
}).omit({ 
  userId: true
});
export const blockRssClientIdSchema = baseSchema.pick({ id: true });

// Types for blockRssClients - used to type API request params and within Components
export type BlockRssClient = typeof blockRssClients.$inferSelect;
export type NewBlockRssClient = z.infer<typeof insertBlockRssClientSchema>;
export type NewBlockRssClientParams = z.infer<typeof insertBlockRssClientParams>;
export type UpdateBlockRssClientParams = z.infer<typeof updateBlockRssClientParams>;
export type BlockRssClientId = z.infer<typeof blockRssClientIdSchema>["id"];
    
// this type infers the return from getBlockRssClients() - meaning it will include any joins
export type CompleteBlockRssClient = Awaited<ReturnType<typeof getBlockRssClients>>["blockRssClients"][number];

