import { sql } from "drizzle-orm";
import { varchar, text, boolean, timestamp, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getForums } from "@/lib/api/forums/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const forums = pgTable('forums', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  answer: text("answer"),
  question: text("question"),
  pin: boolean("pin"),
  parentId: varchar("parent_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (forums) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(forums.name),
  }
});


// Schema for forums - used to validate API requests
const baseSchema = createSelectSchema(forums).omit(timestamps)

export const insertForumSchema = createInsertSchema(forums).omit(timestamps);
export const insertForumParams = baseSchema.extend({
  pin: z.coerce.boolean()
}).omit({ 
  id: true,
  userId: true
});

export const updateForumSchema = baseSchema;
export const updateForumParams = baseSchema.extend({
  pin: z.coerce.boolean()
}).omit({ 
  userId: true
});
export const forumIdSchema = baseSchema.pick({ id: true });

// Types for forums - used to type API request params and within Components
export type Forum = typeof forums.$inferSelect;
export type NewForum = z.infer<typeof insertForumSchema>;
export type NewForumParams = z.infer<typeof insertForumParams>;
export type UpdateForumParams = z.infer<typeof updateForumParams>;
export type ForumId = z.infer<typeof forumIdSchema>["id"];
    
// this type infers the return from getForums() - meaning it will include any joins
export type CompleteForum = Awaited<ReturnType<typeof getForums>>["forums"][number];

