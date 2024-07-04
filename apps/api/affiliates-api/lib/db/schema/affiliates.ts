import { type getAffiliates } from "@/lib/api/affiliates/queries";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const affiliates = pgTable("affiliates", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  isApproved: boolean("is_approved").notNull(),
  note: text("note"),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for affiliates - used to validate API requests
const baseSchema = createSelectSchema(affiliates);

export const insertAffiliateSchema = createInsertSchema(affiliates);
export const insertAffiliateParams = baseSchema
  .extend({
    isApproved: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAffiliateSchema = baseSchema;
export const updateAffiliateParams = baseSchema
  .extend({
    isApproved: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const affiliateIdSchema = baseSchema.pick({ id: true });

// Types for affiliates - used to type API request params and within Components
export type Affiliate = typeof affiliates.$inferSelect;
export type NewAffiliate = z.infer<typeof insertAffiliateSchema>;
export type NewAffiliateParams = z.infer<typeof insertAffiliateParams>;
export type UpdateAffiliateParams = z.infer<typeof updateAffiliateParams>;
export type AffiliateId = z.infer<typeof affiliateIdSchema>["id"];

// this type infers the return from getAffiliates() - meaning it will include any joins
export type CompleteAffiliate = Awaited<
  ReturnType<typeof getAffiliates>
>["affiliates"][number];
