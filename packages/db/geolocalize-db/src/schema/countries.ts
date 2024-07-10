import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const countries = pgTable("countries", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  flag: varchar("flag", { length: 256 }),
  currency: varchar("currency", { length: 256 }),
});

// Schema for countries - used to validate API requests
const baseSchema = createSelectSchema(countries);

export const insertCountrySchema = createInsertSchema(countries);
export const insertCountryParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateCountrySchema = baseSchema;
export const updateCountryParams = baseSchema.extend({});
export const countryIdSchema = baseSchema.pick({ id: true });

// Types for countries - used to type API request params and within Components
export type Country = typeof countries.$inferSelect;
export type NewCountry = z.infer<typeof insertCountrySchema>;
export type NewCountryParams = z.infer<typeof insertCountryParams>;
export type UpdateCountryParams = z.infer<typeof updateCountryParams>;
export type CountryId = z.infer<typeof countryIdSchema>["id"];
