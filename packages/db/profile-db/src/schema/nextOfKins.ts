import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const nextOfKins = pgTable("next_of_kins", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }),
  fullName: varchar("full_name", { length: 256 }),
  mobile: varchar("mobile", { length: 256 }),
  email: varchar("email", { length: 256 }),
  title: varchar("title", { length: 256 }),
  dateOfBirth: varchar("date_of_birth", { length: 256 }),
  relation: varchar("relation", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for nextOfKins - used to validate API requests
const baseSchema = createSelectSchema(nextOfKins).omit(timestamps);

export const insertNextOfKinSchema =
  createInsertSchema(nextOfKins).omit(timestamps);
export const insertNextOfKinParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateNextOfKinSchema = baseSchema;
export const updateNextOfKinParams = baseSchema.extend({}).omit({
  userId: true,
});
export const nextOfKinIdSchema = baseSchema.pick({ id: true });

// Types for nextOfKins - used to type API request params and within Components
export type NextOfKin = typeof nextOfKins.$inferSelect;
export type NewNextOfKin = z.infer<typeof insertNextOfKinSchema>;
export type NewNextOfKinParams = z.infer<typeof insertNextOfKinParams>;
export type UpdateNextOfKinParams = z.infer<typeof updateNextOfKinParams>;
export type NextOfKinId = z.infer<typeof nextOfKinIdSchema>["id"];


