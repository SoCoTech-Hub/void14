import { sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getExternalTokens } from "../api/externalTokens/queries";

export const externalTokens = pgTable("external_tokens", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  creatorId: varchar("creator_id", { length: 256 }),
  externalServiceId: varchar("external_service_id", { length: 256 }),
  ipRestriction: varchar("ip_restriction", { length: 256 }),
  lastAccess: timestamp("last_access"),
  privateToken: varchar("private_token", { length: 256 }),
  sId: varchar("s_id", { length: 256 }),
  token: varchar("token", { length: 256 }),
  tokenType: boolean("token_type"),
  validUntil: timestamp("valid_until"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for externalTokens - used to validate API requests
const baseSchema = createSelectSchema(externalTokens).omit(timestamps);

export const insertExternalTokenSchema =
  createInsertSchema(externalTokens).omit(timestamps);
export const insertExternalTokenParams = baseSchema
  .extend({
    lastAccess: z.coerce.string().min(1),
    tokenType: z.coerce.boolean(),
    validUntil: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateExternalTokenSchema = baseSchema;
export const updateExternalTokenParams = baseSchema
  .extend({
    lastAccess: z.coerce.string().min(1),
    tokenType: z.coerce.boolean(),
    validUntil: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const externalTokenIdSchema = baseSchema.pick({ id: true });

// Types for externalTokens - used to type API request params and within Components
export type ExternalToken = typeof externalTokens.$inferSelect;
export type NewExternalToken = z.infer<typeof insertExternalTokenSchema>;
export type NewExternalTokenParams = z.infer<typeof insertExternalTokenParams>;
export type UpdateExternalTokenParams = z.infer<
  typeof updateExternalTokenParams
>;
export type ExternalTokenId = z.infer<typeof externalTokenIdSchema>["id"];

// this type infers the return from getExternalTokens() - meaning it will include any joins
export type CompleteExternalToken = Awaited<
  ReturnType<typeof getExternalTokens>
>["externalTokens"][number];
