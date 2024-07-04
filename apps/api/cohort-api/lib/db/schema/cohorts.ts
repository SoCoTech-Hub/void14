import { type getCohorts } from "@/lib/api/cohorts/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const cohorts = pgTable("cohorts", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  name: varchar("name", { length: 256 }).notNull(),
  contextId: varchar("context_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  idNumber: varchar("id_number", { length: 256 }),
  theme: varchar("theme", { length: 256 }),
  visible: boolean("visible"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for cohorts - used to validate API requests
const baseSchema = createSelectSchema(cohorts).omit(timestamps);

export const insertCohortSchema = createInsertSchema(cohorts).omit(timestamps);
export const insertCohortParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateCohortSchema = baseSchema;
export const updateCohortParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  visible: z.coerce.boolean(),
});
export const cohortIdSchema = baseSchema.pick({ id: true });

// Types for cohorts - used to type API request params and within Components
export type Cohort = typeof cohorts.$inferSelect;
export type NewCohort = z.infer<typeof insertCohortSchema>;
export type NewCohortParams = z.infer<typeof insertCohortParams>;
export type UpdateCohortParams = z.infer<typeof updateCohortParams>;
export type CohortId = z.infer<typeof cohortIdSchema>["id"];

// this type infers the return from getCohorts() - meaning it will include any joins
export type CompleteCohort = Awaited<
  ReturnType<typeof getCohorts>
>["cohorts"][number];
