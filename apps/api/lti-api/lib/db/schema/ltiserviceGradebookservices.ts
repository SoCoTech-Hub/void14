import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getLtiserviceGradebookservices } from "../api/ltiserviceGradebookservices/queries";

export const ltiserviceGradebookservices = pgTable(
  "ltiservice_gradebookservices",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    baseUrl: text("base_url"),
    courseId: varchar("course_id", { length: 256 }),
    gradeItemId: varchar("grade_item_id", { length: 256 }),
    ltiLinkId: varchar("lti_link_id", { length: 256 }),
    resourceId: varchar("resource_id", { length: 256 }),
    tag: varchar("tag", { length: 256 }),
    toolProxyId: varchar("tool_proxy_id", { length: 256 }),
    typeId: varchar("type_id", { length: 256 }),
  },
);

// Schema for ltiserviceGradebookservices - used to validate API requests
const baseSchema = createSelectSchema(ltiserviceGradebookservices);

export const insertLtiserviceGradebookserviceSchema = createInsertSchema(
  ltiserviceGradebookservices,
);
export const insertLtiserviceGradebookserviceParams = baseSchema
  .extend({})
  .omit({
    id: true,
  });

export const updateLtiserviceGradebookserviceSchema = baseSchema;
export const updateLtiserviceGradebookserviceParams = baseSchema.extend({});
export const ltiserviceGradebookserviceIdSchema = baseSchema.pick({ id: true });

// Types for ltiserviceGradebookservices - used to type API request params and within Components
export type LtiserviceGradebookservice =
  typeof ltiserviceGradebookservices.$inferSelect;
export type NewLtiserviceGradebookservice = z.infer<
  typeof insertLtiserviceGradebookserviceSchema
>;
export type NewLtiserviceGradebookserviceParams = z.infer<
  typeof insertLtiserviceGradebookserviceParams
>;
export type UpdateLtiserviceGradebookserviceParams = z.infer<
  typeof updateLtiserviceGradebookserviceParams
>;
export type LtiserviceGradebookserviceId = z.infer<
  typeof ltiserviceGradebookserviceIdSchema
>["id"];

// this type infers the return from getLtiserviceGradebookservices() - meaning it will include any joins
export type CompleteLtiserviceGradebookservice = Awaited<
  ReturnType<typeof getLtiserviceGradebookservices>
>["ltiserviceGradebookservices"][number];
