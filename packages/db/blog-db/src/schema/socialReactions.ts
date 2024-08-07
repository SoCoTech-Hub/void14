import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { blogs } from "./blogs";
import { socialIcons } from "./socialIcons";

export const socialReactions = pgTable(
  "social_reactions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    blogId: varchar("blog_id", { length: 256 })
      .references(() => blogs.id)
      .notNull(),
    socialIconId: varchar("social_icon_id", { length: 256 })
      .references(() => socialIcons.id)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (socialReactions) => {
    return {
      blogIdIndex: uniqueIndex("social_reactions_blog_id_idx").on(
        socialReactions.blogId,
      ),
    };
  },
);

// Schema for socialReactions - used to validate API requests
const baseSchema = createSelectSchema(socialReactions).omit(timestamps);

export const insertSocialReactionSchema =
  createInsertSchema(socialReactions).omit(timestamps);
export const insertSocialReactionParams = baseSchema
  .extend({
    blogId: z.coerce.string().min(1),
    socialIconId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSocialReactionSchema = baseSchema;
export const updateSocialReactionParams = baseSchema
  .extend({
    blogId: z.coerce.string().min(1),
    socialIconId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const socialReactionIdSchema = baseSchema.pick({ id: true });

// Types for socialReactions - used to type API request params and within Components
export type SocialReaction = typeof socialReactions.$inferSelect;
export type NewSocialReaction = z.infer<typeof insertSocialReactionSchema>;
export type NewSocialReactionParams = z.infer<
  typeof insertSocialReactionParams
>;
export type UpdateSocialReactionParams = z.infer<
  typeof updateSocialReactionParams
>;
export type SocialReactionId = z.infer<typeof socialReactionIdSchema>["id"];
