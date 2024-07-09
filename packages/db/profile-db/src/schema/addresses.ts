import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const addresses = pgTable(
  "addresses",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    line1: varchar("line_1", { length: 256 }),
    line2: varchar("line_2", { length: 256 }),
    city: varchar("city", { length: 256 }),
    zipCode: varchar("zip_code", { length: 256 }),
    state: varchar("state", { length: 256 }),
    country: varchar("country", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (addresses) => {
    return {
      countryIndex: uniqueIndex("country_idx").on(addresses.country),
    };
  },
);

// Schema for addresses - used to validate API requests
const baseSchema = createSelectSchema(addresses).omit(timestamps);

export const insertAddressSchema =
  createInsertSchema(addresses).omit(timestamps);
export const insertAddressParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateAddressSchema = baseSchema;
export const updateAddressParams = baseSchema.extend({}).omit({
  userId: true,
});
export const addressIdSchema = baseSchema.pick({ id: true });

// Types for addresses - used to type API request params and within Components
export type Address = typeof addresses.$inferSelect;
export type NewAddress = z.infer<typeof insertAddressSchema>;
export type NewAddressParams = z.infer<typeof insertAddressParams>;
export type UpdateAddressParams = z.infer<typeof updateAddressParams>;
export type AddressId = z.infer<typeof addressIdSchema>["id"];
