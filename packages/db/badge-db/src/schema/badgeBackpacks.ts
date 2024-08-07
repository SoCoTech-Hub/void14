import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const badgeBackpacks = pgTable("badge_backpacks", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  autoSync: boolean("auto_sync"),
  backpackUid: varchar("backpack_uid", { length: 256 }),
  email: varchar("email", { length: 256 }),
  externalBackpackId: varchar("external_backpack_id", { length: 256 }),
  password: varchar("password", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for badgeBackpacks - used to validate API requests
const baseSchema = createSelectSchema(badgeBackpacks);

export const insertBadgeBackpackSchema = createInsertSchema(badgeBackpacks);
export const insertBadgeBackpackParams = baseSchema
  .extend({
    autoSync: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBadgeBackpackSchema = baseSchema;
export const updateBadgeBackpackParams = baseSchema
  .extend({
    autoSync: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const badgeBackpackIdSchema = baseSchema.pick({ id: true });

// Types for badgeBackpacks - used to type API request params and within Components
export type BadgeBackpack = typeof badgeBackpacks.$inferSelect;
export type NewBadgeBackpack = z.infer<typeof insertBadgeBackpackSchema>;
export type NewBadgeBackpackParams = z.infer<typeof insertBadgeBackpackParams>;
export type UpdateBadgeBackpackParams = z.infer<
  typeof updateBadgeBackpackParams
>;
export type BadgeBackpackId = z.infer<typeof badgeBackpackIdSchema>["id"];
