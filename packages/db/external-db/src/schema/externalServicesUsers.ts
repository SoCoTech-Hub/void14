import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const externalServicesUsers = pgTable("external_services_users", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  externalServiceId: varchar("external_service_id", { length: 256 }),
  ipRestriction: varchar("ip_restriction", { length: 256 }),
  validUntil: timestamp("valid_until"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for externalServicesUsers - used to validate API requests
const baseSchema = createSelectSchema(externalServicesUsers).omit(timestamps);

export const insertExternalServicesUserSchema = createInsertSchema(
  externalServicesUsers,
).omit(timestamps);
export const insertExternalServicesUserParams = baseSchema
  .extend({
    validUntil: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateExternalServicesUserSchema = baseSchema;
export const updateExternalServicesUserParams = baseSchema
  .extend({
    validUntil: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const externalServicesUserIdSchema = baseSchema.pick({ id: true });

// Types for externalServicesUsers - used to type API request params and within Components
export type ExternalServicesUser = typeof externalServicesUsers.$inferSelect;
export type NewExternalServicesUser = z.infer<
  typeof insertExternalServicesUserSchema
>;
export type NewExternalServicesUserParams = z.infer<
  typeof insertExternalServicesUserParams
>;
export type UpdateExternalServicesUserParams = z.infer<
  typeof updateExternalServicesUserParams
>;
export type ExternalServicesUserId = z.infer<
  typeof externalServicesUserIdSchema
>["id"];
