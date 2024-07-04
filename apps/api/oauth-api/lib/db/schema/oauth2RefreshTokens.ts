import { type getOauth2RefreshTokens } from "@/lib/api/oauth2RefreshTokens/queries";
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

import { oauth2Issuers } from "./oauth2Issuers";

export const oauth2RefreshTokens = pgTable(
  "oauth2_refresh_tokens",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    oauth2issuerId: varchar("oauth2issuer_id", { length: 256 })
      .references(() => oauth2Issuers.id, { onDelete: "cascade" })
      .notNull(),
    scopeHash: varchar("scope_hash", { length: 256 }).notNull(),
    token: text("token").notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (oauth2RefreshTokens) => {
    return {
      oauth2issuerIdIndex: uniqueIndex(
        "oauth2_refresh_tokens_oauth2issuer_id_idx",
      ).on(oauth2RefreshTokens.oauth2issuerId),
    };
  },
);

// Schema for oauth2RefreshTokens - used to validate API requests
const baseSchema = createSelectSchema(oauth2RefreshTokens).omit(timestamps);

export const insertOauth2RefreshTokenSchema =
  createInsertSchema(oauth2RefreshTokens).omit(timestamps);
export const insertOauth2RefreshTokenParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateOauth2RefreshTokenSchema = baseSchema;
export const updateOauth2RefreshTokenParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const oauth2RefreshTokenIdSchema = baseSchema.pick({ id: true });

// Types for oauth2RefreshTokens - used to type API request params and within Components
export type Oauth2RefreshToken = typeof oauth2RefreshTokens.$inferSelect;
export type NewOauth2RefreshToken = z.infer<
  typeof insertOauth2RefreshTokenSchema
>;
export type NewOauth2RefreshTokenParams = z.infer<
  typeof insertOauth2RefreshTokenParams
>;
export type UpdateOauth2RefreshTokenParams = z.infer<
  typeof updateOauth2RefreshTokenParams
>;
export type Oauth2RefreshTokenId = z.infer<
  typeof oauth2RefreshTokenIdSchema
>["id"];

// this type infers the return from getOauth2RefreshTokens() - meaning it will include any joins
export type CompleteOauth2RefreshToken = Awaited<
  ReturnType<typeof getOauth2RefreshTokens>
>["oauth2RefreshTokens"][number];
