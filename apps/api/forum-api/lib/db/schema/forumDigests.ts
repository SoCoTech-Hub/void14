import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getForumDigests } from "../api/forumDigests/queries";

export const forumDigests = pgTable("forum_digests", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  forum: varchar("forum", { length: 256 }),
  mailDigest: boolean("mail_digest"),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for forumDigests - used to validate API requests
const baseSchema = createSelectSchema(forumDigests);

export const insertForumDigestSchema = createInsertSchema(forumDigests);
export const insertForumDigestParams = baseSchema
  .extend({
    mailDigest: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateForumDigestSchema = baseSchema;
export const updateForumDigestParams = baseSchema
  .extend({
    mailDigest: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const forumDigestIdSchema = baseSchema.pick({ id: true });

// Types for forumDigests - used to type API request params and within Components
export type ForumDigest = typeof forumDigests.$inferSelect;
export type NewForumDigest = z.infer<typeof insertForumDigestSchema>;
export type NewForumDigestParams = z.infer<typeof insertForumDigestParams>;
export type UpdateForumDigestParams = z.infer<typeof updateForumDigestParams>;
export type ForumDigestId = z.infer<typeof forumDigestIdSchema>["id"];

// this type infers the return from getForumDigests() - meaning it will include any joins
export type CompleteForumDigest = Awaited<
  ReturnType<typeof getForumDigests>
>["forumDigests"][number];
