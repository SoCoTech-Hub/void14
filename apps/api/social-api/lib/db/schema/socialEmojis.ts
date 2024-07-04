import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getSocialEmojis } from "../api/socialEmojis/queries";

export const socialEmojis = pgTable("social_emojis", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
});

// Schema for socialEmojis - used to validate API requests
const baseSchema = createSelectSchema(socialEmojis);

export const insertSocialEmojiSchema = createInsertSchema(socialEmojis);
export const insertSocialEmojiParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateSocialEmojiSchema = baseSchema;
export const updateSocialEmojiParams = baseSchema.extend({});
export const socialEmojiIdSchema = baseSchema.pick({ id: true });

// Types for socialEmojis - used to type API request params and within Components
export type SocialEmoji = typeof socialEmojis.$inferSelect;
export type NewSocialEmoji = z.infer<typeof insertSocialEmojiSchema>;
export type NewSocialEmojiParams = z.infer<typeof insertSocialEmojiParams>;
export type UpdateSocialEmojiParams = z.infer<typeof updateSocialEmojiParams>;
export type SocialEmojiId = z.infer<typeof socialEmojiIdSchema>["id"];

// this type infers the return from getSocialEmojis() - meaning it will include any joins
export type CompleteSocialEmoji = Awaited<
  ReturnType<typeof getSocialEmojis>
>["socialEmojis"][number];
