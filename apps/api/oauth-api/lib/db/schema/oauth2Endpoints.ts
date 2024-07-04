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

import { type getOauth2Endpoints } from "../api/oauth2Endpoints/queries";
import { oauth2Issuers } from "./oauth2Issuers";

export const oauth2Endpoints = pgTable(
  "oauth2_endpoints",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    oauth2issuerId: varchar("oauth2issuer_id", { length: 256 })
      .references(() => oauth2Issuers.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 256 }),
    url: text("url"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (oauth2Endpoints) => {
    return {
      oauth2issuerIdIndex: uniqueIndex(
        "oauth2_endpoints_oauth2issuer_id_idx",
      ).on(oauth2Endpoints.oauth2issuerId),
    };
  },
);

// Schema for oauth2Endpoints - used to validate API requests
const baseSchema = createSelectSchema(oauth2Endpoints).omit(timestamps);

export const insertOauth2EndpointSchema =
  createInsertSchema(oauth2Endpoints).omit(timestamps);
export const insertOauth2EndpointParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateOauth2EndpointSchema = baseSchema;
export const updateOauth2EndpointParams = baseSchema
  .extend({
    oauth2issuerId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const oauth2EndpointIdSchema = baseSchema.pick({ id: true });

// Types for oauth2Endpoints - used to type API request params and within Components
export type Oauth2Endpoint = typeof oauth2Endpoints.$inferSelect;
export type NewOauth2Endpoint = z.infer<typeof insertOauth2EndpointSchema>;
export type NewOauth2EndpointParams = z.infer<
  typeof insertOauth2EndpointParams
>;
export type UpdateOauth2EndpointParams = z.infer<
  typeof updateOauth2EndpointParams
>;
export type Oauth2EndpointId = z.infer<typeof oauth2EndpointIdSchema>["id"];

// this type infers the return from getOauth2Endpoints() - meaning it will include any joins
export type CompleteOauth2Endpoint = Awaited<
  ReturnType<typeof getOauth2Endpoints>
>["oauth2Endpoints"][number];
