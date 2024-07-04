import { type getTags } from "@/lib/api/tags/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { tagColls } from "./tagColls";

export const tags = pgTable("tags", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  flag: integer("flag"),
  isStandard: boolean("is_standard"),
  name: varchar("name", { length: 256 }),
  rawName: varchar("raw_name", { length: 256 }),
  tagCollId: varchar("tag_coll_id", { length: 256 })
    .references(() => tagColls.id)
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for tags - used to validate API requests
const baseSchema = createSelectSchema(tags).omit(timestamps);

export const insertTagSchema = createInsertSchema(tags).omit(timestamps);
export const insertTagParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    flag: z.coerce.number(),
    isStandard: z.coerce.boolean(),
    tagCollId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateTagSchema = baseSchema;
export const updateTagParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    flag: z.coerce.number(),
    isStandard: z.coerce.boolean(),
    tagCollId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const tagIdSchema = baseSchema.pick({ id: true });

// Types for tags - used to type API request params and within Components
export type Tag = typeof tags.$inferSelect;
export type NewTag = z.infer<typeof insertTagSchema>;
export type NewTagParams = z.infer<typeof insertTagParams>;
export type UpdateTagParams = z.infer<typeof updateTagParams>;
export type TagId = z.infer<typeof tagIdSchema>["id"];

// this type infers the return from getTags() - meaning it will include any joins
export type CompleteTag = Awaited<ReturnType<typeof getTags>>["tags"][number];
