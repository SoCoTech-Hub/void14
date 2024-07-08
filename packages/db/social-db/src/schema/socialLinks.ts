import { type getSocialLinks } from "@/lib/api/socialLinks/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const socialLinks = pgTable("social_links", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  url: varchar("url", { length: 256 }),
});

// Schema for socialLinks - used to validate API requests
const baseSchema = createSelectSchema(socialLinks);

export const insertSocialLinkSchema = createInsertSchema(socialLinks);
export const insertSocialLinkParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateSocialLinkSchema = baseSchema;
export const updateSocialLinkParams = baseSchema.extend({});
export const socialLinkIdSchema = baseSchema.pick({ id: true });

// Types for socialLinks - used to type API request params and within Components
export type SocialLink = typeof socialLinks.$inferSelect;
export type NewSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type NewSocialLinkParams = z.infer<typeof insertSocialLinkParams>;
export type UpdateSocialLinkParams = z.infer<typeof updateSocialLinkParams>;
export type SocialLinkId = z.infer<typeof socialLinkIdSchema>["id"];

// this type infers the return from getSocialLinks() - meaning it will include any joins
export type CompleteSocialLink = Awaited<
  ReturnType<typeof getSocialLinks>
>["socialLinks"][number];
