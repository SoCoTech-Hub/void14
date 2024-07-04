import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGenders } from "../../api/genders/queries";

export const genders = pgTable("genders", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  icon: varchar("icon", { length: 256 }),
});

// Schema for genders - used to validate API requests
const baseSchema = createSelectSchema(genders);

export const insertGenderSchema = createInsertSchema(genders);
export const insertGenderParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateGenderSchema = baseSchema;
export const updateGenderParams = baseSchema.extend({});
export const genderIdSchema = baseSchema.pick({ id: true });

// Types for genders - used to type API request params and within Components
export type Gender = typeof genders.$inferSelect;
export type NewGender = z.infer<typeof insertGenderSchema>;
export type NewGenderParams = z.infer<typeof insertGenderParams>;
export type UpdateGenderParams = z.infer<typeof updateGenderParams>;
export type GenderId = z.infer<typeof genderIdSchema>["id"];

// this type infers the return from getGenders() - meaning it will include any joins
export type CompleteGender = Awaited<
  ReturnType<typeof getGenders>
>["genders"][number];
