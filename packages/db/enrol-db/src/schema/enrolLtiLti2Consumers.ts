import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const enrolLtiLti2Consumers = pgTable("enrol_lti_lti2_consumers", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  consumerGuid: varchar("consumer_guid", { length: 256 }),
  consumerKey: text("consumer_key"),
  consumerKey256: varchar("consumer_key256", { length: 256 }),
  consumerName: varchar("consumer_name", { length: 256 }),
  consumerVersion: varchar("consumer_version", { length: 256 }),
  enabled: boolean("enabled"),
  lastAccess: date("last_access"),
  ltiVersion: varchar("lti_version", { length: 256 }),
  name: varchar("name", { length: 256 }),
  profile: text("profile"),
  protected: boolean("protected"),
  secret: varchar("secret", { length: 256 }),
  settings: text("settings"),
  toolProxy: text("tool_proxy"),
  enableFrom: timestamp("enable_from"),
  enableUntil: timestamp("enable_until"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiLti2Consumers - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiLti2Consumers).omit(timestamps);

export const insertEnrolLtiLti2ConsumerSchema = createInsertSchema(
  enrolLtiLti2Consumers,
).omit(timestamps);
export const insertEnrolLtiLti2ConsumerParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
    lastAccess: z.coerce.string().min(1),
    protected: z.coerce.boolean(),
    enableFrom: z.coerce.string().min(1),
    enableUntil: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateEnrolLtiLti2ConsumerSchema = baseSchema;
export const updateEnrolLtiLti2ConsumerParams = baseSchema.extend({
  enabled: z.coerce.boolean(),
  lastAccess: z.coerce.string().min(1),
  protected: z.coerce.boolean(),
  enableFrom: z.coerce.string().min(1),
  enableUntil: z.coerce.string().min(1),
});
export const enrolLtiLti2ConsumerIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiLti2Consumers - used to type API request params and within Components
export type EnrolLtiLti2Consumer = typeof enrolLtiLti2Consumers.$inferSelect;
export type NewEnrolLtiLti2Consumer = z.infer<
  typeof insertEnrolLtiLti2ConsumerSchema
>;
export type NewEnrolLtiLti2ConsumerParams = z.infer<
  typeof insertEnrolLtiLti2ConsumerParams
>;
export type UpdateEnrolLtiLti2ConsumerParams = z.infer<
  typeof updateEnrolLtiLti2ConsumerParams
>;
export type EnrolLtiLti2ConsumerId = z.infer<
  typeof enrolLtiLti2ConsumerIdSchema
>["id"];
