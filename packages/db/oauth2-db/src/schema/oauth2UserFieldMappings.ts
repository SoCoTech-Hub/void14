import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { oauth2Issuers } from "./oauth2Issuers";

export const oauth2UserFieldMappings = pgTable(
  "oauth2_user_field_mappings",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    externalField: varchar("external_field", { length: 256 }),
    internalField: varchar("internal_field", { length: 256 }),
    oauth2issuerId: varchar("oauth2issuer_id", { length: 256 })
      .references(() => oauth2Issuers.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (oauth2UserFieldMappings) => {
    return {
      oauth2issuerIdIndex: uniqueIndex("oauth2issuer_id_idx").on(
        oauth2UserFieldMappings.oauth2issuerId,
      ),
    };
  },
);

// Schema for oauth2UserFieldMappings - used to validate API requests
const baseSchema = createSelectSchema(oauth2UserFieldMappings).omit(timestamps);

export const insertOauth2UserFieldMappingSchema = createInsertSchema(
  oauth2UserFieldMappings,
).omit(timestamps);
export const insertOauth2UserFieldMappingParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateOauth2UserFieldMappingSchema = baseSchema;
export const updateOauth2UserFieldMappingParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const oauth2UserFieldMappingIdSchema = baseSchema.pick({ id: true });

// Types for oauth2UserFieldMappings - used to type API request params and within Components
export type Oauth2UserFieldMapping =
  typeof oauth2UserFieldMappings.$inferSelect;
export type NewOauth2UserFieldMapping = z.infer<
  typeof insertOauth2UserFieldMappingSchema
>;
export type NewOauth2UserFieldMappingParams = z.infer<
  typeof insertOauth2UserFieldMappingParams
>;
export type UpdateOauth2UserFieldMappingParams = z.infer<
  typeof updateOauth2UserFieldMappingParams
>;
export type Oauth2UserFieldMappingId = z.infer<
  typeof oauth2UserFieldMappingIdSchema
>["id"];
