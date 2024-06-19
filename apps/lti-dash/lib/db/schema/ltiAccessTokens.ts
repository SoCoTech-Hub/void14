import { sql } from "drizzle-orm";
import { timestamp, text, varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getLtiAccessTokens } from "@/lib/api/ltiAccessTokens/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const ltiAccessTokens = pgTable('lti_access_tokens', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  lastAccess: timestamp("last_access"),
  scope: text("scope"),
  token: varchar("token", { length: 256 }),
  typeId: varchar("type_id", { length: 256 }),
  validUntil: timestamp("valid_until"),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for ltiAccessTokens - used to validate API requests
const baseSchema = createSelectSchema(ltiAccessTokens).omit(timestamps)

export const insertLtiAccessTokenSchema = createInsertSchema(ltiAccessTokens).omit(timestamps);
export const insertLtiAccessTokenParams = baseSchema.extend({
  lastAccess: z.coerce.string().min(1),
  validUntil: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateLtiAccessTokenSchema = baseSchema;
export const updateLtiAccessTokenParams = baseSchema.extend({
  lastAccess: z.coerce.string().min(1),
  validUntil: z.coerce.string().min(1)
})
export const ltiAccessTokenIdSchema = baseSchema.pick({ id: true });

// Types for ltiAccessTokens - used to type API request params and within Components
export type LtiAccessToken = typeof ltiAccessTokens.$inferSelect;
export type NewLtiAccessToken = z.infer<typeof insertLtiAccessTokenSchema>;
export type NewLtiAccessTokenParams = z.infer<typeof insertLtiAccessTokenParams>;
export type UpdateLtiAccessTokenParams = z.infer<typeof updateLtiAccessTokenParams>;
export type LtiAccessTokenId = z.infer<typeof ltiAccessTokenIdSchema>["id"];
    
// this type infers the return from getLtiAccessTokens() - meaning it will include any joins
export type CompleteLtiAccessToken = Awaited<ReturnType<typeof getLtiAccessTokens>>["ltiAccessTokens"][number];

