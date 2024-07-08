import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const enrolLtiLti2Nonces = pgTable("enrol_lti_lti2_nonces", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  consumerId: varchar("consumer_id", { length: 256 }),
  expires: timestamp("expires"),
  value: varchar("value", { length: 256 }).notNull(),
});

// Schema for enrolLtiLti2Nonces - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiLti2Nonces);

export const insertEnrolLtiLti2NonceSchema =
  createInsertSchema(enrolLtiLti2Nonces);
export const insertEnrolLtiLti2NonceParams = baseSchema
  .extend({
    expires: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateEnrolLtiLti2NonceSchema = baseSchema;
export const updateEnrolLtiLti2NonceParams = baseSchema.extend({
  expires: z.coerce.string().min(1),
});
export const enrolLtiLti2NonceIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiLti2Nonces - used to type API request params and within Components
export type EnrolLtiLti2Nonce = typeof enrolLtiLti2Nonces.$inferSelect;
export type NewEnrolLtiLti2Nonce = z.infer<
  typeof insertEnrolLtiLti2NonceSchema
>;
export type NewEnrolLtiLti2NonceParams = z.infer<
  typeof insertEnrolLtiLti2NonceParams
>;
export type UpdateEnrolLtiLti2NonceParams = z.infer<
  typeof updateEnrolLtiLti2NonceParams
>;
export type EnrolLtiLti2NonceId = z.infer<
  typeof enrolLtiLti2NonceIdSchema
>["id"];


