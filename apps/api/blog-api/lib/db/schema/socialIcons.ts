import type { z } from "zod";
import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { nanoid } from "@soco/utils";

import type { getSocialIcons } from "../../api/socialIcons/queries";

export const socialIcons = pgTable(
  "social_icons",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    emoji: varchar("emoji", { length: 256 }).notNull(),
  },
  (socialIcons) => {
    return {
      emojiIndex: uniqueIndex("emoji_idx").on(socialIcons.emoji),
    };
  },
);

// Schema for socialIcons - used to validate API requests
const baseSchema = createSelectSchema(socialIcons);

export const insertSocialIconSchema = createInsertSchema(socialIcons);
export const insertSocialIconParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateSocialIconSchema = baseSchema;
export const updateSocialIconParams = baseSchema.extend({});
export const socialIconIdSchema = baseSchema.pick({ id: true });

// Types for socialIcons - used to type API request params and within Components
export type SocialIcon = typeof socialIcons.$inferSelect;
export type NewSocialIcon = z.infer<typeof insertSocialIconSchema>;
export type NewSocialIconParams = z.infer<typeof insertSocialIconParams>;
export type UpdateSocialIconParams = z.infer<typeof updateSocialIconParams>;
export type SocialIconId = z.infer<typeof socialIconIdSchema>["id"];

// this type infers the return from getSocialIcons() - meaning it will include any joins
export type CompleteSocialIcon = Awaited<
  ReturnType<typeof getSocialIcons>
>["socialIcons"][number];
