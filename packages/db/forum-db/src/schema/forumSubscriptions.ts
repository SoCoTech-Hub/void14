import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { forums } from "./forums";

export const forumSubscriptions = pgTable("forum_subscriptions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  forumId: varchar("forum_id", { length: 256 })
    .references(() => forums.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for forumSubscriptions - used to validate API requests
const baseSchema = createSelectSchema(forumSubscriptions);

export const insertForumSubscriptionSchema =
  createInsertSchema(forumSubscriptions);
export const insertForumSubscriptionParams = baseSchema
  .extend({
    forumId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateForumSubscriptionSchema = baseSchema;
export const updateForumSubscriptionParams = baseSchema
  .extend({
    forumId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const forumSubscriptionIdSchema = baseSchema.pick({ id: true });

// Types for forumSubscriptions - used to type API request params and within Components
export type ForumSubscription = typeof forumSubscriptions.$inferSelect;
export type NewForumSubscription = z.infer<
  typeof insertForumSubscriptionSchema
>;
export type NewForumSubscriptionParams = z.infer<
  typeof insertForumSubscriptionParams
>;
export type UpdateForumSubscriptionParams = z.infer<
  typeof updateForumSubscriptionParams
>;
export type ForumSubscriptionId = z.infer<
  typeof forumSubscriptionIdSchema
>["id"];

