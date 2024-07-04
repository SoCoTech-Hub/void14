import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getBadgeBackpackOauth2s } from "../api/badgeBackpackOauth2s/queries";

export const badgeBackpackOauth2s = pgTable("badge_backpack_oauth2s", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  expires: integer("expires"),
  externalBackpackId: varchar("external_backpack_id", { length: 256 }),
  issuerId: varchar("issuer_id", { length: 256 }),
  refreshToken: text("refresh_token"),
  scope: text("scope"),
  token: text("token"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for badgeBackpackOauth2s - used to validate API requests
const baseSchema = createSelectSchema(badgeBackpackOauth2s).omit(timestamps);

export const insertBadgeBackpackOauth2Schema =
  createInsertSchema(badgeBackpackOauth2s).omit(timestamps);
export const insertBadgeBackpackOauth2Params = baseSchema
  .extend({
    expires: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBadgeBackpackOauth2Schema = baseSchema;
export const updateBadgeBackpackOauth2Params = baseSchema
  .extend({
    expires: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const badgeBackpackOauth2IdSchema = baseSchema.pick({ id: true });

// Types for badgeBackpackOauth2s - used to type API request params and within Components
export type BadgeBackpackOauth2 = typeof badgeBackpackOauth2s.$inferSelect;
export type NewBadgeBackpackOauth2 = z.infer<
  typeof insertBadgeBackpackOauth2Schema
>;
export type NewBadgeBackpackOauth2Params = z.infer<
  typeof insertBadgeBackpackOauth2Params
>;
export type UpdateBadgeBackpackOauth2Params = z.infer<
  typeof updateBadgeBackpackOauth2Params
>;
export type BadgeBackpackOauth2Id = z.infer<
  typeof badgeBackpackOauth2IdSchema
>["id"];

// this type infers the return from getBadgeBackpackOauth2s() - meaning it will include any joins
export type CompleteBadgeBackpackOauth2 = Awaited<
  ReturnType<typeof getBadgeBackpackOauth2s>
>["badgeBackpackOauth2s"][number];
