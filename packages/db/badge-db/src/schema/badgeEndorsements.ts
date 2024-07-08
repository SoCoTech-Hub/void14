
import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { badges } from "./badges";

export const badgeEndorsements = pgTable(
  "badge_endorsements",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    badgeId: varchar("badge_id", { length: 256 })
      .references(() => badges.id)
      .notNull(),
    claimComment: text("claim_comment"),
    claimId: varchar("claim_id", { length: 256 }),
    dateIssued: timestamp("date_issued"),
    issuerEmail: varchar("issuer_email", { length: 256 }),
    issuerName: varchar("issuer_name", { length: 256 }),
    issuerUrl: varchar("issuer_url", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (badgeEndorsements) => {
    return {
      badgeIdIndex: uniqueIndex("be_badge_id_idx").on(
        badgeEndorsements.badgeId,
      ),
    };
  },
);

// Schema for badgeEndorsements - used to validate API requests
const baseSchema = createSelectSchema(badgeEndorsements).omit(timestamps);

export const insertBadgeEndorsementSchema =
  createInsertSchema(badgeEndorsements).omit(timestamps);
export const insertBadgeEndorsementParams = baseSchema
  .extend({
    badgeId: z.coerce.string().min(1),
    dateIssued: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBadgeEndorsementSchema = baseSchema;
export const updateBadgeEndorsementParams = baseSchema.extend({
  badgeId: z.coerce.string().min(1),
  dateIssued: z.coerce.string().min(1),
});
export const badgeEndorsementIdSchema = baseSchema.pick({ id: true });

// Types for badgeEndorsements - used to type API request params and within Components
export type BadgeEndorsement = typeof badgeEndorsements.$inferSelect;
export type NewBadgeEndorsement = z.infer<typeof insertBadgeEndorsementSchema>;
export type NewBadgeEndorsementParams = z.infer<
  typeof insertBadgeEndorsementParams
>;
export type UpdateBadgeEndorsementParams = z.infer<
  typeof updateBadgeEndorsementParams
>;
export type BadgeEndorsementId = z.infer<typeof badgeEndorsementIdSchema>["id"];


