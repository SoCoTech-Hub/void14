import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getForumTrackPrefs } from "../../api/forumTrackPrefs/queries";
import { forums } from "./forums";

export const forumTrackPrefs = pgTable("forum_track_prefs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  forumId: varchar("forum_id", { length: 256 })
    .references(() => forums.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for forumTrackPrefs - used to validate API requests
const baseSchema = createSelectSchema(forumTrackPrefs);

export const insertForumTrackPrefSchema = createInsertSchema(forumTrackPrefs);
export const insertForumTrackPrefParams = baseSchema
  .extend({
    forumId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateForumTrackPrefSchema = baseSchema;
export const updateForumTrackPrefParams = baseSchema
  .extend({
    forumId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const forumTrackPrefIdSchema = baseSchema.pick({ id: true });

// Types for forumTrackPrefs - used to type API request params and within Components
export type ForumTrackPref = typeof forumTrackPrefs.$inferSelect;
export type NewForumTrackPref = z.infer<typeof insertForumTrackPrefSchema>;
export type NewForumTrackPrefParams = z.infer<
  typeof insertForumTrackPrefParams
>;
export type UpdateForumTrackPrefParams = z.infer<
  typeof updateForumTrackPrefParams
>;
export type ForumTrackPrefId = z.infer<typeof forumTrackPrefIdSchema>["id"];

// this type infers the return from getForumTrackPrefs() - meaning it will include any joins
export type CompleteForumTrackPref = Awaited<
  ReturnType<typeof getForumTrackPrefs>
>["forumTrackPrefs"][number];
