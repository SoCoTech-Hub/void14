import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getUniversities } from "../api/universities/queries";

export const universities = pgTable("universities", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  logo: varchar("logo", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for universities - used to validate API requests
const baseSchema = createSelectSchema(universities).omit(timestamps);

export const insertUniversitySchema =
  createInsertSchema(universities).omit(timestamps);
export const insertUniversityParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateUniversitySchema = baseSchema;
export const updateUniversityParams = baseSchema.extend({});
export const universityIdSchema = baseSchema.pick({ id: true });

// Types for universities - used to type API request params and within Components
export type University = typeof universities.$inferSelect;
export type NewUniversity = z.infer<typeof insertUniversitySchema>;
export type NewUniversityParams = z.infer<typeof insertUniversityParams>;
export type UpdateUniversityParams = z.infer<typeof updateUniversityParams>;
export type UniversityId = z.infer<typeof universityIdSchema>["id"];

// this type infers the return from getUniversities() - meaning it will include any joins
export type CompleteUniversity = Awaited<
  ReturnType<typeof getUniversities>
>["universities"][number];
