
import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { countries } from "./countries";

export const countryOrganizations = pgTable(
  "country_organizations",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    countryId: varchar("country_id", { length: 256 })
      .references(() => countries.id, { onDelete: "cascade" })
      .notNull(),
    organizationId: varchar("organization_id", { length: 256 }).notNull(),
  },
  (countryOrganizations) => {
    return {
      organizationIdIndex: uniqueIndex("organization_id_idx").on(
        countryOrganizations.organizationId,
      ),
    };
  },
);

// Schema for countryOrganizations - used to validate API requests
const baseSchema = createSelectSchema(countryOrganizations);

export const insertCountryOrganizationSchema =
  createInsertSchema(countryOrganizations);
export const insertCountryOrganizationParams = baseSchema
  .extend({
    countryId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateCountryOrganizationSchema = baseSchema;
export const updateCountryOrganizationParams = baseSchema.extend({
  countryId: z.coerce.string().min(1),
});
export const countryOrganizationIdSchema = baseSchema.pick({ id: true });

// Types for countryOrganizations - used to type API request params and within Components
export type CountryOrganization = typeof countryOrganizations.$inferSelect;
export type NewCountryOrganization = z.infer<
  typeof insertCountryOrganizationSchema
>;
export type NewCountryOrganizationParams = z.infer<
  typeof insertCountryOrganizationParams
>;
export type UpdateCountryOrganizationParams = z.infer<
  typeof updateCountryOrganizationParams
>;
export type CountryOrganizationId = z.infer<
  typeof countryOrganizationIdSchema
>["id"];

