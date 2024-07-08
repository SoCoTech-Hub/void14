import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { badgeBackpacks } from "./badgeBackpacks";

export const badgeExternals = pgTable("badge_externals", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  assertion: text("assertion"),
  badgeBackpackId: varchar("badge_backpack_id", { length: 256 })
    .references(() => badgeBackpacks.id)
    .notNull(),
  collectionId: varchar("collection_id", { length: 256 }),
  entityId: varchar("entity_id", { length: 256 }),
});

// Schema for badgeExternals - used to validate API requests
const baseSchema = createSelectSchema(badgeExternals);

export const insertBadgeExternalSchema = createInsertSchema(badgeExternals);
export const insertBadgeExternalParams = baseSchema
  .extend({
    badgeBackpackId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBadgeExternalSchema = baseSchema;
export const updateBadgeExternalParams = baseSchema.extend({
  badgeBackpackId: z.coerce.string().min(1),
});
export const badgeExternalIdSchema = baseSchema.pick({ id: true });

// Types for badgeExternals - used to type API request params and within Components
export type BadgeExternal = typeof badgeExternals.$inferSelect;
export type NewBadgeExternal = z.infer<typeof insertBadgeExternalSchema>;
export type NewBadgeExternalParams = z.infer<typeof insertBadgeExternalParams>;
export type UpdateBadgeExternalParams = z.infer<
  typeof updateBadgeExternalParams
>;
export type BadgeExternalId = z.infer<typeof badgeExternalIdSchema>["id"];

