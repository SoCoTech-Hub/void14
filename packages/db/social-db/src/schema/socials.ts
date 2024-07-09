import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { socialEmojis } from "./socialEmojis";

export const socials = pgTable("socials", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  tableName: varchar("table_name", { length: 256 }).notNull(),
  fieldId: varchar("field_id", { length: 256 }).notNull(),
  socialEmojiId: varchar("social_emoji_id", { length: 256 })
    .references(() => socialEmojis.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for socials - used to validate API requests
const baseSchema = createSelectSchema(socials);

export const insertSocialSchema = createInsertSchema(socials);
export const insertSocialParams = baseSchema
  .extend({
    socialEmojiId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSocialSchema = baseSchema;
export const updateSocialParams = baseSchema
  .extend({
    socialEmojiId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const socialIdSchema = baseSchema.pick({ id: true });

// Types for socials - used to type API request params and within Components
export type Social = typeof socials.$inferSelect;
export type NewSocial = z.infer<typeof insertSocialSchema>;
export type NewSocialParams = z.infer<typeof insertSocialParams>;
export type UpdateSocialParams = z.infer<typeof updateSocialParams>;
export type SocialId = z.infer<typeof socialIdSchema>["id"];

