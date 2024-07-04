import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getEnrolLtiLti2ResourceLinks } from "../../api/enrolLtiLti2ResourceLinks/queries";

export const enrolLtiLti2ResourceLinks = pgTable(
  "enrol_lti_lti2_resource_links",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    consumerId: varchar("consumer_id", { length: 256 }),
    contextId: varchar("context_id", { length: 256 }),
    ltiResourceLinkKey: varchar("lti_resource_link_key", { length: 256 }),
    primaryResourceLinkId: varchar("primary_resource_link_id", { length: 256 }),
    settings: text("settings"),
    shareApproved: boolean("share_approved"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for enrolLtiLti2ResourceLinks - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiLti2ResourceLinks).omit(
  timestamps,
);

export const insertEnrolLtiLti2ResourceLinkSchema = createInsertSchema(
  enrolLtiLti2ResourceLinks,
).omit(timestamps);
export const insertEnrolLtiLti2ResourceLinkParams = baseSchema
  .extend({
    shareApproved: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateEnrolLtiLti2ResourceLinkSchema = baseSchema;
export const updateEnrolLtiLti2ResourceLinkParams = baseSchema.extend({
  shareApproved: z.coerce.boolean(),
});
export const enrolLtiLti2ResourceLinkIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiLti2ResourceLinks - used to type API request params and within Components
export type EnrolLtiLti2ResourceLink =
  typeof enrolLtiLti2ResourceLinks.$inferSelect;
export type NewEnrolLtiLti2ResourceLink = z.infer<
  typeof insertEnrolLtiLti2ResourceLinkSchema
>;
export type NewEnrolLtiLti2ResourceLinkParams = z.infer<
  typeof insertEnrolLtiLti2ResourceLinkParams
>;
export type UpdateEnrolLtiLti2ResourceLinkParams = z.infer<
  typeof updateEnrolLtiLti2ResourceLinkParams
>;
export type EnrolLtiLti2ResourceLinkId = z.infer<
  typeof enrolLtiLti2ResourceLinkIdSchema
>["id"];

// this type infers the return from getEnrolLtiLti2ResourceLinks() - meaning it will include any joins
export type CompleteEnrolLtiLti2ResourceLink = Awaited<
  ReturnType<typeof getEnrolLtiLti2ResourceLinks>
>["enrolLtiLti2ResourceLinks"][number];
