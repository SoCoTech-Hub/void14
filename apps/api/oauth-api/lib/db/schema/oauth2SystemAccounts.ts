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

import { type getOauth2SystemAccounts } from "../../api/oauth2SystemAccounts/queries";
import { oauth2Issuers } from "./oauth2Issuers";

export const oauth2SystemAccounts = pgTable(
  "oauth2_system_accounts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    email: text("email"),
    grantedScopes: text("granted_scopes"),
    oauth2issuerId: varchar("oauth2issuer_id", { length: 256 })
      .references(() => oauth2Issuers.id, { onDelete: "cascade" })
      .notNull(),
    refreshToken: text("refresh_token"),
    username: text("username"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (oauth2SystemAccounts) => {
    return {
      oauth2issuerIdIndex: uniqueIndex(
        "oauth2_system_accounts_oauth2issuer_id_idx",
      ).on(oauth2SystemAccounts.oauth2issuerId),
    };
  },
);

// Schema for oauth2SystemAccounts - used to validate API requests
const baseSchema = createSelectSchema(oauth2SystemAccounts).omit(timestamps);

export const insertOauth2SystemAccountSchema =
  createInsertSchema(oauth2SystemAccounts).omit(timestamps);
export const insertOauth2SystemAccountParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateOauth2SystemAccountSchema = baseSchema;
export const updateOauth2SystemAccountParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const oauth2SystemAccountIdSchema = baseSchema.pick({ id: true });

// Types for oauth2SystemAccounts - used to type API request params and within Components
export type Oauth2SystemAccount = typeof oauth2SystemAccounts.$inferSelect;
export type NewOauth2SystemAccount = z.infer<
  typeof insertOauth2SystemAccountSchema
>;
export type NewOauth2SystemAccountParams = z.infer<
  typeof insertOauth2SystemAccountParams
>;
export type UpdateOauth2SystemAccountParams = z.infer<
  typeof updateOauth2SystemAccountParams
>;
export type Oauth2SystemAccountId = z.infer<
  typeof oauth2SystemAccountIdSchema
>["id"];

// this type infers the return from getOauth2SystemAccounts() - meaning it will include any joins
export type CompleteOauth2SystemAccount = Awaited<
  ReturnType<typeof getOauth2SystemAccounts>
>["oauth2SystemAccounts"][number];
