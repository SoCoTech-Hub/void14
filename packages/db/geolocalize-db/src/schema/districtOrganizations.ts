import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { districts } from "./districts";

export const districtOrganizations = pgTable(
  "district_organizations",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    districtId: varchar("district_id", { length: 256 })
      .references(() => districts.id, { onDelete: "cascade" })
      .notNull(),
    organizationId: varchar("organization_id", { length: 256 }).notNull(),
  },
  (districtOrganizations) => {
    return {
      organizationIdIndex: uniqueIndex("organization_id_idx").on(
        districtOrganizations.organizationId,
      ),
    };
  },
);

// Schema for districtOrganizations - used to validate API requests
const baseSchema = createSelectSchema(districtOrganizations);

export const insertDistrictOrganizationSchema = createInsertSchema(
  districtOrganizations,
);
export const insertDistrictOrganizationParams = baseSchema
  .extend({
    districtId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateDistrictOrganizationSchema = baseSchema;
export const updateDistrictOrganizationParams = baseSchema.extend({
  districtId: z.coerce.string().min(1),
});
export const districtOrganizationIdSchema = baseSchema.pick({ id: true });

// Types for districtOrganizations - used to type API request params and within Components
export type DistrictOrganization = typeof districtOrganizations.$inferSelect;
export type NewDistrictOrganization = z.infer<
  typeof insertDistrictOrganizationSchema
>;
export type NewDistrictOrganizationParams = z.infer<
  typeof insertDistrictOrganizationParams
>;
export type UpdateDistrictOrganizationParams = z.infer<
  typeof updateDistrictOrganizationParams
>;
export type DistrictOrganizationId = z.infer<
  typeof districtOrganizationIdSchema
>["id"];
