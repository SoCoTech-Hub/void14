import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";


export const badgeExternalBackpacks = pgTable("badge_external_backpacks", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  apiVersion: varchar("api_version", { length: 256 }),
  backpackApiUrl: varchar("backpack_api_url", { length: 256 }),
  backpackWebUrl: varchar("backpack_web_url", { length: 256 }),
  oauth2IssuerId: varchar("oauth2_issuer_id", { length: 256 }),
  sortOrder: integer("sort_order"),
});

// Schema for badgeExternalBackpacks - used to validate API requests
const baseSchema = createSelectSchema(badgeExternalBackpacks);

export const insertBadgeExternalBackpackSchema = createInsertSchema(
  badgeExternalBackpacks,
);
export const insertBadgeExternalBackpackParams = baseSchema
  .extend({
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateBadgeExternalBackpackSchema = baseSchema;
export const updateBadgeExternalBackpackParams = baseSchema.extend({
  sortOrder: z.coerce.number(),
});
export const badgeExternalBackpackIdSchema = baseSchema.pick({ id: true });

// Types for badgeExternalBackpacks - used to type API request params and within Components
export type BadgeExternalBackpack = typeof badgeExternalBackpacks.$inferSelect;
export type NewBadgeExternalBackpack = z.infer<
  typeof insertBadgeExternalBackpackSchema
>;
export type NewBadgeExternalBackpackParams = z.infer<
  typeof insertBadgeExternalBackpackParams
>;
export type UpdateBadgeExternalBackpackParams = z.infer<
  typeof updateBadgeExternalBackpackParams
>;
export type BadgeExternalBackpackId = z.infer<
  typeof badgeExternalBackpackIdSchema
>["id"];


