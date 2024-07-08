
import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const affiliatesSettings = pgTable("affiliates_settings", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  rate: integer("rate").notNull(),
  terms: text("terms"),
  isActive: boolean("is_active"),
});

// Schema for affiliatesSettings - used to validate API requests
const baseSchema = createSelectSchema(affiliatesSettings);

export const insertAffiliatesSettingSchema =
  createInsertSchema(affiliatesSettings);
export const insertAffiliatesSettingParams = baseSchema
  .extend({
    rate: z.coerce.number(),
    isActive: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateAffiliatesSettingSchema = baseSchema;
export const updateAffiliatesSettingParams = baseSchema.extend({
  rate: z.coerce.number(),
  isActive: z.coerce.boolean(),
});
export const affiliatesSettingIdSchema = baseSchema.pick({ id: true });

// Types for affiliatesSettings - used to type API request params and within Components
export type AffiliatesSetting = typeof affiliatesSettings.$inferSelect;
export type NewAffiliatesSetting = z.infer<
  typeof insertAffiliatesSettingSchema
>;
export type NewAffiliatesSettingParams = z.infer<
  typeof insertAffiliatesSettingParams
>;
export type UpdateAffiliatesSettingParams = z.infer<
  typeof updateAffiliatesSettingParams
>;
export type AffiliatesSettingId = z.infer<
  typeof affiliatesSettingIdSchema
>["id"];

