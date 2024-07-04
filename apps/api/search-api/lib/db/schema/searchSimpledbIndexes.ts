import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getSearchSimpledbIndexes } from "../api/searchSimpledbIndexes/queries";

export const searchSimpledbIndexes = pgTable("search_simpledb_indexes", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  areaId: varchar("area_id", { length: 256 }),
  content: text("content"),
  contextId: varchar("context_id", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  description1: text("description_1"),
  description2: text("description_2"),
  docId: varchar("doc_id", { length: 256 }),
  itemId: varchar("item_id", { length: 256 }),
  ownerUserId: varchar("owner_user_id", { length: 256 }),
  title: text("title"),
  type: boolean("type"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for searchSimpledbIndexes - used to validate API requests
const baseSchema = createSelectSchema(searchSimpledbIndexes).omit(timestamps);

export const insertSearchSimpledbIndexSchema = createInsertSchema(
  searchSimpledbIndexes,
).omit(timestamps);
export const insertSearchSimpledbIndexParams = baseSchema
  .extend({
    type: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSearchSimpledbIndexSchema = baseSchema;
export const updateSearchSimpledbIndexParams = baseSchema
  .extend({
    type: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const searchSimpledbIndexIdSchema = baseSchema.pick({ id: true });

// Types for searchSimpledbIndexes - used to type API request params and within Components
export type SearchSimpledbIndex = typeof searchSimpledbIndexes.$inferSelect;
export type NewSearchSimpledbIndex = z.infer<
  typeof insertSearchSimpledbIndexSchema
>;
export type NewSearchSimpledbIndexParams = z.infer<
  typeof insertSearchSimpledbIndexParams
>;
export type UpdateSearchSimpledbIndexParams = z.infer<
  typeof updateSearchSimpledbIndexParams
>;
export type SearchSimpledbIndexId = z.infer<
  typeof searchSimpledbIndexIdSchema
>["id"];

// this type infers the return from getSearchSimpledbIndexes() - meaning it will include any joins
export type CompleteSearchSimpledbIndex = Awaited<
  ReturnType<typeof getSearchSimpledbIndexes>
>["searchSimpledbIndexes"][number];
