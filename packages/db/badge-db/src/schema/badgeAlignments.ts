import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { badges } from "./badges";

export const badgeAlignments = pgTable("badge_alignments", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  badgeId: varchar("badge_id", { length: 256 })
    .references(() => badges.id)
    .notNull(),
  targetCode: varchar("target_code", { length: 256 }),
  targetDescription: text("target_description"),
  targetFramework: varchar("target_framework", { length: 256 }),
  targetName: varchar("target_name", { length: 256 }),
  targetUrl: varchar("target_url", { length: 256 }),
});

// Schema for badgeAlignments - used to validate API requests
const baseSchema = createSelectSchema(badgeAlignments);

export const insertBadgeAlignmentSchema = createInsertSchema(badgeAlignments);
export const insertBadgeAlignmentParams = baseSchema
  .extend({
    badgeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBadgeAlignmentSchema = baseSchema;
export const updateBadgeAlignmentParams = baseSchema.extend({
  badgeId: z.coerce.string().min(1),
});
export const badgeAlignmentIdSchema = baseSchema.pick({ id: true });

// Types for badgeAlignments - used to type API request params and within Components
export type BadgeAlignment = typeof badgeAlignments.$inferSelect;
export type NewBadgeAlignment = z.infer<typeof insertBadgeAlignmentSchema>;
export type NewBadgeAlignmentParams = z.infer<
  typeof insertBadgeAlignmentParams
>;
export type UpdateBadgeAlignmentParams = z.infer<
  typeof updateBadgeAlignmentParams
>;
export type BadgeAlignmentId = z.infer<typeof badgeAlignmentIdSchema>["id"];


