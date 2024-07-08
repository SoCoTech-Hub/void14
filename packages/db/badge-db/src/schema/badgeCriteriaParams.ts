
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { badgeCriterias } from "./badgeCriterias";

export const badgeCriteriaParams = pgTable("badge_criteria_params", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  badgeCriteriaId: varchar("badge_criteria_id", { length: 256 })
    .references(() => badgeCriterias.id)
    .notNull(),
  name: varchar("name", { length: 256 }),
  value: varchar("value", { length: 256 }),
});

// Schema for badgeCriteriaParams - used to validate API requests
const baseSchema = createSelectSchema(badgeCriteriaParams);

export const insertBadgeCriteriaParamSchema =
  createInsertSchema(badgeCriteriaParams);
export const insertBadgeCriteriaParamParams = baseSchema
  .extend({
    badgeCriteriaId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBadgeCriteriaParamSchema = baseSchema;
export const updateBadgeCriteriaParamParams = baseSchema.extend({
  badgeCriteriaId: z.coerce.string().min(1),
});
export const badgeCriteriaParamIdSchema = baseSchema.pick({ id: true });

// Types for badgeCriteriaParams - used to type API request params and within Components
export type BadgeCriteriaParam = typeof badgeCriteriaParams.$inferSelect;
export type NewBadgeCriteriaParam = z.infer<
  typeof insertBadgeCriteriaParamSchema
>;
export type NewBadgeCriteriaParamParams = z.infer<
  typeof insertBadgeCriteriaParamParams
>;
export type UpdateBadgeCriteriaParamParams = z.infer<
  typeof updateBadgeCriteriaParamParams
>;
export type BadgeCriteriaParamId = z.infer<
  typeof badgeCriteriaParamIdSchema
>["id"];


