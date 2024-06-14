import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getForumQueues } from "@/lib/api/forumQueues/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const forumQueues = pgTable('forum_queues', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  discussionId: varchar("discussion_id", { length: 256 }),
  postId: varchar("post_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for forumQueues - used to validate API requests
const baseSchema = createSelectSchema(forumQueues).omit(timestamps)

export const insertForumQueueSchema = createInsertSchema(forumQueues).omit(timestamps);
export const insertForumQueueParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateForumQueueSchema = baseSchema;
export const updateForumQueueParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const forumQueueIdSchema = baseSchema.pick({ id: true });

// Types for forumQueues - used to type API request params and within Components
export type ForumQueue = typeof forumQueues.$inferSelect;
export type NewForumQueue = z.infer<typeof insertForumQueueSchema>;
export type NewForumQueueParams = z.infer<typeof insertForumQueueParams>;
export type UpdateForumQueueParams = z.infer<typeof updateForumQueueParams>;
export type ForumQueueId = z.infer<typeof forumQueueIdSchema>["id"];
    
// this type infers the return from getForumQueues() - meaning it will include any joins
export type CompleteForumQueue = Awaited<ReturnType<typeof getForumQueues>>["forumQueues"][number];

