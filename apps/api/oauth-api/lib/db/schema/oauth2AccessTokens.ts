import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getOauth2AccessTokens } from "../api/oauth2AccessTokens/queries";
import { oauth2Issuers } from "./oauth2Issuers";

export const oauth2AccessTokens = pgTable(
  "oauth2_access_tokens",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    expires: integer("expires").notNull(),
    oauth2issuerId: varchar("oauth2issuer_id", { length: 256 })
      .references(() => oauth2Issuers.id, { onDelete: "cascade" })
      .notNull(),
    scope: text("scope"),
    token: text("token"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (oauth2AccessTokens) => {
    return {
      oauth2issuerIdIndex: uniqueIndex(
        "oauth2_access_tokens_oauth2issuer_id_idx",
      ).on(oauth2AccessTokens.oauth2issuerId),
    };
  },
);

// Schema for oauth2AccessTokens - used to validate API requests
const baseSchema = createSelectSchema(oauth2AccessTokens).omit(timestamps);

export const insertOauth2AccessTokenSchema =
  createInsertSchema(oauth2AccessTokens).omit(timestamps);
export const insertOauth2AccessTokenParams = baseSchema
  .extend({
    expires: z.coerce.number(),
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateOauth2AccessTokenSchema = baseSchema;
export const updateOauth2AccessTokenParams = baseSchema
  .extend({
    expires: z.coerce.number(),
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const oauth2AccessTokenIdSchema = baseSchema.pick({ id: true });

// Types for oauth2AccessTokens - used to type API request params and within Components
export type Oauth2AccessToken = typeof oauth2AccessTokens.$inferSelect;
export type NewOauth2AccessToken = z.infer<
  typeof insertOauth2AccessTokenSchema
>;
export type NewOauth2AccessTokenParams = z.infer<
  typeof insertOauth2AccessTokenParams
>;
export type UpdateOauth2AccessTokenParams = z.infer<
  typeof updateOauth2AccessTokenParams
>;
export type Oauth2AccessTokenId = z.infer<
  typeof oauth2AccessTokenIdSchema
>["id"];

// this type infers the return from getOauth2AccessTokens() - meaning it will include any joins
export type CompleteOauth2AccessToken = Awaited<
  ReturnType<typeof getOauth2AccessTokens>
>["oauth2AccessTokens"][number];
