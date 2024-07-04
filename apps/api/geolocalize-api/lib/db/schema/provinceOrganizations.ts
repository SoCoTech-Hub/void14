import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getProvinceOrganizations } from "../../api/provinceOrganizations/queries";
import { provinces } from "./provinces";

export const provinceOrganizations = pgTable(
  "province_organizations",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    provinceId: varchar("province_id", { length: 256 })
      .references(() => provinces.id, { onDelete: "cascade" })
      .notNull(),
    organizationId: varchar("organization_id", { length: 256 }).notNull(),
  },
  (provinceOrganizations) => {
    return {
      organizationIdIndex: uniqueIndex("organization_id_idx").on(
        provinceOrganizations.organizationId,
      ),
    };
  },
);

// Schema for provinceOrganizations - used to validate API requests
const baseSchema = createSelectSchema(provinceOrganizations);

export const insertProvinceOrganizationSchema = createInsertSchema(
  provinceOrganizations,
);
export const insertProvinceOrganizationParams = baseSchema
  .extend({
    provinceId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateProvinceOrganizationSchema = baseSchema;
export const updateProvinceOrganizationParams = baseSchema.extend({
  provinceId: z.coerce.string().min(1),
});
export const provinceOrganizationIdSchema = baseSchema.pick({ id: true });

// Types for provinceOrganizations - used to type API request params and within Components
export type ProvinceOrganization = typeof provinceOrganizations.$inferSelect;
export type NewProvinceOrganization = z.infer<
  typeof insertProvinceOrganizationSchema
>;
export type NewProvinceOrganizationParams = z.infer<
  typeof insertProvinceOrganizationParams
>;
export type UpdateProvinceOrganizationParams = z.infer<
  typeof updateProvinceOrganizationParams
>;
export type ProvinceOrganizationId = z.infer<
  typeof provinceOrganizationIdSchema
>["id"];

// this type infers the return from getProvinceOrganizations() - meaning it will include any joins
export type CompleteProvinceOrganization = Awaited<
  ReturnType<typeof getProvinceOrganizations>
>["provinceOrganizations"][number];
