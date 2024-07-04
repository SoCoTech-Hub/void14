import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getEnrolLtiResourceLinks } from "../api/enrolLtiResourceLinks/queries";

export const enrolLtiResourceLinks = pgTable("enrol_lti_resource_links", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextMembershipsUrl: varchar("context_memberships_url", { length: 256 }),
  lineItemScope: varchar("line_item_scope", { length: 256 }),
  lineItemService: varchar("line_item_service", { length: 256 }),
  lineItemsService: varchar("line_items_service", { length: 256 }),
  ltiContextId: varchar("lti_context_id", { length: 256 }),
  ltiDeploymentId: varchar("lti_deployment_id", { length: 256 }),
  nrpsServiceVersions: varchar("nrps_service_versions", { length: 256 }),
  resourceId: varchar("resource_id", { length: 256 }),
  resourceLinkId: varchar("resource_link_id", { length: 256 }),
  resultScope: varchar("result_scope", { length: 256 }),
  scoreScope: varchar("score_scope", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiResourceLinks - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiResourceLinks).omit(timestamps);

export const insertEnrolLtiResourceLinkSchema = createInsertSchema(
  enrolLtiResourceLinks,
).omit(timestamps);
export const insertEnrolLtiResourceLinkParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateEnrolLtiResourceLinkSchema = baseSchema;
export const updateEnrolLtiResourceLinkParams = baseSchema.extend({});
export const enrolLtiResourceLinkIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiResourceLinks - used to type API request params and within Components
export type EnrolLtiResourceLink = typeof enrolLtiResourceLinks.$inferSelect;
export type NewEnrolLtiResourceLink = z.infer<
  typeof insertEnrolLtiResourceLinkSchema
>;
export type NewEnrolLtiResourceLinkParams = z.infer<
  typeof insertEnrolLtiResourceLinkParams
>;
export type UpdateEnrolLtiResourceLinkParams = z.infer<
  typeof updateEnrolLtiResourceLinkParams
>;
export type EnrolLtiResourceLinkId = z.infer<
  typeof enrolLtiResourceLinkIdSchema
>["id"];

// this type infers the return from getEnrolLtiResourceLinks() - meaning it will include any joins
export type CompleteEnrolLtiResourceLink = Awaited<
  ReturnType<typeof getEnrolLtiResourceLinks>
>["enrolLtiResourceLinks"][number];
