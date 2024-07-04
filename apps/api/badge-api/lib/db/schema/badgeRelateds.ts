import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getBadgeRelateds } from "../../api/badgeRelateds/queries";
import { badges } from "./badges";

export const badgeRelateds = pgTable("badge_relateds", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  badgeId: varchar("badge_id", { length: 256 })
    .references(() => badges.id)
    .notNull(),
  relatedBadgeId: varchar("related_badge_id", { length: 256 })
    .references(() => badges.id)
    .notNull(),
});

// Schema for badgeRelateds - used to validate API requests
const baseSchema = createSelectSchema(badgeRelateds);

export const insertBadgeRelatedSchema = createInsertSchema(badgeRelateds);
export const insertBadgeRelatedParams = baseSchema
  .extend({
    badgeId: z.coerce.string().min(1),
    relatedBadgeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBadgeRelatedSchema = baseSchema;
export const updateBadgeRelatedParams = baseSchema.extend({
  badgeId: z.coerce.string().min(1),
  relatedBadgeId: z.coerce.string().min(1),
});
export const badgeRelatedIdSchema = baseSchema.pick({ id: true });

// Types for badgeRelateds - used to type API request params and within Components
export type BadgeRelated = typeof badgeRelateds.$inferSelect;
export type NewBadgeRelated = z.infer<typeof insertBadgeRelatedSchema>;
export type NewBadgeRelatedParams = z.infer<typeof insertBadgeRelatedParams>;
export type UpdateBadgeRelatedParams = z.infer<typeof updateBadgeRelatedParams>;
export type BadgeRelatedId = z.infer<typeof badgeRelatedIdSchema>["id"];

// this type infers the return from getBadgeRelateds() - meaning it will include any joins
export type CompleteBadgeRelated = Awaited<
  ReturnType<typeof getBadgeRelateds>
>["badgeRelateds"][number];
