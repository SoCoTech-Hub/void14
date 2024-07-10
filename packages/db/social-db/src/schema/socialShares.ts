import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { socialLinks } from "./socialLinks";

export const socialShares = pgTable("social_shares", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  fieldId: varchar("field_id", { length: 256 }).notNull(),
  tableName: varchar("table_name", { length: 256 }).notNull(),
  socialLinkId: varchar("social_link_id", { length: 256 })
    .references(() => socialLinks.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for socialShares - used to validate API requests
const baseSchema = createSelectSchema(socialShares);

export const insertSocialShareSchema = createInsertSchema(socialShares);
export const insertSocialShareParams = baseSchema
  .extend({
    socialLinkId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSocialShareSchema = baseSchema;
export const updateSocialShareParams = baseSchema
  .extend({
    socialLinkId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const socialShareIdSchema = baseSchema.pick({ id: true });

// Types for socialShares - used to type API request params and within Components
export type SocialShare = typeof socialShares.$inferSelect;
export type NewSocialShare = z.infer<typeof insertSocialShareSchema>;
export type NewSocialShareParams = z.infer<typeof insertSocialShareParams>;
export type UpdateSocialShareParams = z.infer<typeof updateSocialShareParams>;
export type SocialShareId = z.infer<typeof socialShareIdSchema>["id"];
