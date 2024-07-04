import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getEnrolLtiUserResourceLinks } from "../api/enrolLtiUserResourceLinks/queries";
import { enrolLtiResourceLinks } from "./enrolLtiResourceLinks";
import { enrolLtiUsers } from "./enrolLtiUsers";

export const enrolLtiUserResourceLinks = pgTable(
  "enrol_lti_user_resource_links",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    enrolLtiUserId: varchar("enrol_lti_user_id", { length: 256 })
      .references(() => enrolLtiUsers.id, { onDelete: "cascade" })
      .notNull(),
    enrolLtiResourceLinkId: varchar("enrol_lti_resource_link_id", {
      length: 256,
    })
      .references(() => enrolLtiResourceLinks.id, { onDelete: "cascade" })
      .notNull(),
  },
);

// Schema for enrolLtiUserResourceLinks - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiUserResourceLinks);

export const insertEnrolLtiUserResourceLinkSchema = createInsertSchema(
  enrolLtiUserResourceLinks,
);
export const insertEnrolLtiUserResourceLinkParams = baseSchema
  .extend({
    enrolLtiUserId: z.coerce.string().min(1),
    enrolLtiResourceLinkId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateEnrolLtiUserResourceLinkSchema = baseSchema;
export const updateEnrolLtiUserResourceLinkParams = baseSchema.extend({
  enrolLtiUserId: z.coerce.string().min(1),
  enrolLtiResourceLinkId: z.coerce.string().min(1),
});
export const enrolLtiUserResourceLinkIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiUserResourceLinks - used to type API request params and within Components
export type EnrolLtiUserResourceLink =
  typeof enrolLtiUserResourceLinks.$inferSelect;
export type NewEnrolLtiUserResourceLink = z.infer<
  typeof insertEnrolLtiUserResourceLinkSchema
>;
export type NewEnrolLtiUserResourceLinkParams = z.infer<
  typeof insertEnrolLtiUserResourceLinkParams
>;
export type UpdateEnrolLtiUserResourceLinkParams = z.infer<
  typeof updateEnrolLtiUserResourceLinkParams
>;
export type EnrolLtiUserResourceLinkId = z.infer<
  typeof enrolLtiUserResourceLinkIdSchema
>["id"];

// this type infers the return from getEnrolLtiUserResourceLinks() - meaning it will include any joins
export type CompleteEnrolLtiUserResourceLink = Awaited<
  ReturnType<typeof getEnrolLtiUserResourceLinks>
>["enrolLtiUserResourceLinks"][number];
