import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getEnrolLtiLti2ShareKeys } from "../api/enrolLtiLti2ShareKeys/queries";

export const enrolLtiLti2ShareKeys = pgTable("enrol_lti_lti2_share_keys", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  autoApprove: boolean("auto_approve"),
  expires: timestamp("expires"),
  resourceLinkId: varchar("resource_link_id", { length: 256 }),
  shareKey: varchar("share_key", { length: 256 }),
});

// Schema for enrolLtiLti2ShareKeys - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiLti2ShareKeys);

export const insertEnrolLtiLti2ShareKeySchema = createInsertSchema(
  enrolLtiLti2ShareKeys,
);
export const insertEnrolLtiLti2ShareKeyParams = baseSchema
  .extend({
    autoApprove: z.coerce.boolean(),
    expires: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateEnrolLtiLti2ShareKeySchema = baseSchema;
export const updateEnrolLtiLti2ShareKeyParams = baseSchema.extend({
  autoApprove: z.coerce.boolean(),
  expires: z.coerce.string().min(1),
});
export const enrolLtiLti2ShareKeyIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiLti2ShareKeys - used to type API request params and within Components
export type EnrolLtiLti2ShareKey = typeof enrolLtiLti2ShareKeys.$inferSelect;
export type NewEnrolLtiLti2ShareKey = z.infer<
  typeof insertEnrolLtiLti2ShareKeySchema
>;
export type NewEnrolLtiLti2ShareKeyParams = z.infer<
  typeof insertEnrolLtiLti2ShareKeyParams
>;
export type UpdateEnrolLtiLti2ShareKeyParams = z.infer<
  typeof updateEnrolLtiLti2ShareKeyParams
>;
export type EnrolLtiLti2ShareKeyId = z.infer<
  typeof enrolLtiLti2ShareKeyIdSchema
>["id"];

// this type infers the return from getEnrolLtiLti2ShareKeys() - meaning it will include any joins
export type CompleteEnrolLtiLti2ShareKey = Awaited<
  ReturnType<typeof getEnrolLtiLti2ShareKeys>
>["enrolLtiLti2ShareKeys"][number];
