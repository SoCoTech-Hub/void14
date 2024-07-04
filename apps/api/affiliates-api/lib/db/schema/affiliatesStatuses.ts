import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getAffiliatesStatuses } from "../api/affiliatesStatuses/queries";

export const affiliatesStatuses = pgTable("affiliates_statuses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  color: varchar("color", { length: 256 }).notNull(),
});

// Schema for affiliatesStatuses - used to validate API requests
const baseSchema = createSelectSchema(affiliatesStatuses);

export const insertAffiliatesStatusSchema =
  createInsertSchema(affiliatesStatuses);
export const insertAffiliatesStatusParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateAffiliatesStatusSchema = baseSchema;
export const updateAffiliatesStatusParams = baseSchema.extend({});
export const affiliatesStatusIdSchema = baseSchema.pick({ id: true });

// Types for affiliatesStatuses - used to type API request params and within Components
export type AffiliatesStatus = typeof affiliatesStatuses.$inferSelect;
export type NewAffiliatesStatus = z.infer<typeof insertAffiliatesStatusSchema>;
export type NewAffiliatesStatusParams = z.infer<
  typeof insertAffiliatesStatusParams
>;
export type UpdateAffiliatesStatusParams = z.infer<
  typeof updateAffiliatesStatusParams
>;
export type AffiliatesStatusId = z.infer<typeof affiliatesStatusIdSchema>["id"];

// this type infers the return from getAffiliatesStatuses() - meaning it will include any joins
export type CompleteAffiliatesStatus = Awaited<
  ReturnType<typeof getAffiliatesStatuses>
>["affiliatesStatuses"][number];
