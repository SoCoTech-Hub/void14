import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getForumReads } from "../../api/forumReads/queries";

export const forumReads = pgTable("forum_reads", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  discussionId: varchar("discussion_id", { length: 256 }),
  firstRead: timestamp("first_read"),
  lastRead: timestamp("last_read"),
  forumId: varchar("forum_id", { length: 256 }),
  postId: varchar("post_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for forumReads - used to validate API requests
const baseSchema = createSelectSchema(forumReads);

export const insertForumReadSchema = createInsertSchema(forumReads);
export const insertForumReadParams = baseSchema
  .extend({
    firstRead: z.coerce.string().min(1),
    lastRead: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateForumReadSchema = baseSchema;
export const updateForumReadParams = baseSchema
  .extend({
    firstRead: z.coerce.string().min(1),
    lastRead: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const forumReadIdSchema = baseSchema.pick({ id: true });

// Types for forumReads - used to type API request params and within Components
export type ForumRead = typeof forumReads.$inferSelect;
export type NewForumRead = z.infer<typeof insertForumReadSchema>;
export type NewForumReadParams = z.infer<typeof insertForumReadParams>;
export type UpdateForumReadParams = z.infer<typeof updateForumReadParams>;
export type ForumReadId = z.infer<typeof forumReadIdSchema>["id"];

// this type infers the return from getForumReads() - meaning it will include any joins
export type CompleteForumRead = Awaited<
  ReturnType<typeof getForumReads>
>["forumReads"][number];
