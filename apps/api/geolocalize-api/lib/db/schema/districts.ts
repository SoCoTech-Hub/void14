import { type getDistricts } from "@/lib/api/districts/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { provinces } from "./provinces";

export const districts = pgTable("districts", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  provinceId: varchar("province_id", { length: 256 })
    .references(() => provinces.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for districts - used to validate API requests
const baseSchema = createSelectSchema(districts);

export const insertDistrictSchema = createInsertSchema(districts);
export const insertDistrictParams = baseSchema
  .extend({
    provinceId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateDistrictSchema = baseSchema;
export const updateDistrictParams = baseSchema.extend({
  provinceId: z.coerce.string().min(1),
});
export const districtIdSchema = baseSchema.pick({ id: true });

// Types for districts - used to type API request params and within Components
export type District = typeof districts.$inferSelect;
export type NewDistrict = z.infer<typeof insertDistrictSchema>;
export type NewDistrictParams = z.infer<typeof insertDistrictParams>;
export type UpdateDistrictParams = z.infer<typeof updateDistrictParams>;
export type DistrictId = z.infer<typeof districtIdSchema>["id"];

// this type infers the return from getDistricts() - meaning it will include any joins
export type CompleteDistrict = Awaited<
  ReturnType<typeof getDistricts>
>["districts"][number];
