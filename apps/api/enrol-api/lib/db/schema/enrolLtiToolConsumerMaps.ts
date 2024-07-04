import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getEnrolLtiToolConsumerMaps } from "../api/enrolLtiToolConsumerMaps/queries";

export const enrolLtiToolConsumerMaps = pgTable(
  "enrol_lti_tool_consumer_maps",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    consumerId: varchar("consumer_id", { length: 256 }),
    toolId: varchar("tool_id", { length: 256 }),
  },
);

// Schema for enrolLtiToolConsumerMaps - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiToolConsumerMaps);

export const insertEnrolLtiToolConsumerMapSchema = createInsertSchema(
  enrolLtiToolConsumerMaps,
);
export const insertEnrolLtiToolConsumerMapParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateEnrolLtiToolConsumerMapSchema = baseSchema;
export const updateEnrolLtiToolConsumerMapParams = baseSchema.extend({});
export const enrolLtiToolConsumerMapIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiToolConsumerMaps - used to type API request params and within Components
export type EnrolLtiToolConsumerMap =
  typeof enrolLtiToolConsumerMaps.$inferSelect;
export type NewEnrolLtiToolConsumerMap = z.infer<
  typeof insertEnrolLtiToolConsumerMapSchema
>;
export type NewEnrolLtiToolConsumerMapParams = z.infer<
  typeof insertEnrolLtiToolConsumerMapParams
>;
export type UpdateEnrolLtiToolConsumerMapParams = z.infer<
  typeof updateEnrolLtiToolConsumerMapParams
>;
export type EnrolLtiToolConsumerMapId = z.infer<
  typeof enrolLtiToolConsumerMapIdSchema
>["id"];

// this type infers the return from getEnrolLtiToolConsumerMaps() - meaning it will include any joins
export type CompleteEnrolLtiToolConsumerMap = Awaited<
  ReturnType<typeof getEnrolLtiToolConsumerMaps>
>["enrolLtiToolConsumerMaps"][number];
