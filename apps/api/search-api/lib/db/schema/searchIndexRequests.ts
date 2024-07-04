import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getSearchIndexRequests } from "../api/searchIndexRequests/queries";

export const searchIndexRequests = pgTable("search_index_requests", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  indexPriority: integer("index_priority"),
  partialArea: varchar("partial_area", { length: 256 }),
  partialTime: timestamp("partial_time"),
  searchArea: varchar("search_area", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for searchIndexRequests - used to validate API requests
const baseSchema = createSelectSchema(searchIndexRequests).omit(timestamps);

export const insertSearchIndexRequestSchema =
  createInsertSchema(searchIndexRequests).omit(timestamps);
export const insertSearchIndexRequestParams = baseSchema
  .extend({
    indexPriority: z.coerce.number(),
    partialTime: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateSearchIndexRequestSchema = baseSchema;
export const updateSearchIndexRequestParams = baseSchema.extend({
  indexPriority: z.coerce.number(),
  partialTime: z.coerce.string().min(1),
});
export const searchIndexRequestIdSchema = baseSchema.pick({ id: true });

// Types for searchIndexRequests - used to type API request params and within Components
export type SearchIndexRequest = typeof searchIndexRequests.$inferSelect;
export type NewSearchIndexRequest = z.infer<
  typeof insertSearchIndexRequestSchema
>;
export type NewSearchIndexRequestParams = z.infer<
  typeof insertSearchIndexRequestParams
>;
export type UpdateSearchIndexRequestParams = z.infer<
  typeof updateSearchIndexRequestParams
>;
export type SearchIndexRequestId = z.infer<
  typeof searchIndexRequestIdSchema
>["id"];

// this type infers the return from getSearchIndexRequests() - meaning it will include any joins
export type CompleteSearchIndexRequest = Awaited<
  ReturnType<typeof getSearchIndexRequests>
>["searchIndexRequests"][number];
