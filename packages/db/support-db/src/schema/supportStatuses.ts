import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const supportStatuses = pgTable("support_statuses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  color: varchar("color", { length: 256 }),
});

// Schema for supportStatuses - used to validate API requests
const baseSchema = createSelectSchema(supportStatuses);

export const insertSupportStatusSchema = createInsertSchema(supportStatuses);
export const insertSupportStatusParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateSupportStatusSchema = baseSchema;
export const updateSupportStatusParams = baseSchema.extend({});
export const supportStatusIdSchema = baseSchema.pick({ id: true });

// Types for supportStatuses - used to type API request params and within Components
export type SupportStatus = typeof supportStatuses.$inferSelect;
export type NewSupportStatus = z.infer<typeof insertSupportStatusSchema>;
export type NewSupportStatusParams = z.infer<typeof insertSupportStatusParams>;
export type UpdateSupportStatusParams = z.infer<
  typeof updateSupportStatusParams
>;
export type SupportStatusId = z.infer<typeof supportStatusIdSchema>["id"];


