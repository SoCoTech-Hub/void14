import { boolean, text, varchar, integer, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getLicenses } from "@/lib/api/licenses/queries";

import { nanoid } from "@/lib/utils";


export const licenses = pgTable('licenses', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  custom: boolean("custom"),
  enabled: boolean("enabled"),
  fullName: text("full_name"),
  shortName: varchar("short_name", { length: 256 }),
  sortOrder: integer("sort_order"),
  source: varchar("source", { length: 256 }),
  version: integer("version")
}, (licenses) => {
  return {
    sortOrderIndex: uniqueIndex('sort_order_idx').on(licenses.sortOrder),
  }
});


// Schema for licenses - used to validate API requests
const baseSchema = createSelectSchema(licenses)

export const insertLicenseSchema = createInsertSchema(licenses);
export const insertLicenseParams = baseSchema.extend({
  custom: z.coerce.boolean(),
  enabled: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
  version: z.coerce.number()
}).omit({ 
  id: true
});

export const updateLicenseSchema = baseSchema;
export const updateLicenseParams = baseSchema.extend({
  custom: z.coerce.boolean(),
  enabled: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
  version: z.coerce.number()
})
export const licenseIdSchema = baseSchema.pick({ id: true });

// Types for licenses - used to type API request params and within Components
export type License = typeof licenses.$inferSelect;
export type NewLicense = z.infer<typeof insertLicenseSchema>;
export type NewLicenseParams = z.infer<typeof insertLicenseParams>;
export type UpdateLicenseParams = z.infer<typeof updateLicenseParams>;
export type LicenseId = z.infer<typeof licenseIdSchema>["id"];
    
// this type infers the return from getLicenses() - meaning it will include any joins
export type CompleteLicense = Awaited<ReturnType<typeof getLicenses>>["licenses"][number];

