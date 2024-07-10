import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const registrationHubs = pgTable(
  "registration_hubs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    confirmed: boolean("confirmed"),
    hubName: varchar("hub_name", { length: 256 }),
    hubUrl: varchar("hub_url", { length: 256 }).notNull(),
    secret: varchar("secret", { length: 256 }),
    token: varchar("token", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (registrationHubs) => {
    return {
      hubNameIndex: uniqueIndex("hub_name_idx").on(registrationHubs.hubName),
    };
  },
);

// Schema for registrationHubs - used to validate API requests
const baseSchema = createSelectSchema(registrationHubs).omit(timestamps);

export const insertRegistrationHubSchema =
  createInsertSchema(registrationHubs).omit(timestamps);
export const insertRegistrationHubParams = baseSchema
  .extend({
    confirmed: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateRegistrationHubSchema = baseSchema;
export const updateRegistrationHubParams = baseSchema.extend({
  confirmed: z.coerce.boolean(),
});
export const registrationHubIdSchema = baseSchema.pick({ id: true });

// Types for registrationHubs - used to type API request params and within Components
export type RegistrationHub = typeof registrationHubs.$inferSelect;
export type NewRegistrationHub = z.infer<typeof insertRegistrationHubSchema>;
export type NewRegistrationHubParams = z.infer<
  typeof insertRegistrationHubParams
>;
export type UpdateRegistrationHubParams = z.infer<
  typeof updateRegistrationHubParams
>;
export type RegistrationHubId = z.infer<typeof registrationHubIdSchema>["id"];
