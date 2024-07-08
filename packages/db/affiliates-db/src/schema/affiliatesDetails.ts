
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { affiliates } from "./affiliates";

export const affiliatesDetails = pgTable("affiliates_details", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  number: integer("number"),
  code: varchar("code", { length: 256 }),
  bank: varchar("bank", { length: 256 }),
  type: varchar("type", { length: 256 }),
  affiliateId: varchar("affiliate_id", { length: 256 })
    .references(() => affiliates.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for affiliatesDetails - used to validate API requests
const baseSchema = createSelectSchema(affiliatesDetails);

export const insertAffiliatesDetailSchema =
  createInsertSchema(affiliatesDetails);
export const insertAffiliatesDetailParams = baseSchema
  .extend({
    number: z.coerce.number(),
    affiliateId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateAffiliatesDetailSchema = baseSchema;
export const updateAffiliatesDetailParams = baseSchema.extend({
  number: z.coerce.number(),
  affiliateId: z.coerce.string().min(1),
});
export const affiliatesDetailIdSchema = baseSchema.pick({ id: true });

// Types for affiliatesDetails - used to type API request params and within Components
export type AffiliatesDetail = typeof affiliatesDetails.$inferSelect;
export type NewAffiliatesDetail = z.infer<typeof insertAffiliatesDetailSchema>;
export type NewAffiliatesDetailParams = z.infer<
  typeof insertAffiliatesDetailParams
>;
export type UpdateAffiliatesDetailParams = z.infer<
  typeof updateAffiliatesDetailParams
>;
export type AffiliatesDetailId = z.infer<typeof affiliatesDetailIdSchema>["id"];


