import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCompetencyTemplateCohorts } from "../api/competencyTemplateCohorts/queries";
import { competencyTemplates } from "./competencyTemplates";

export const competencyTemplateCohorts = pgTable(
  "competency_template_cohorts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    competencyTemplateId: varchar("competency_template_id", { length: 256 })
      .references(() => competencyTemplates.id, { onDelete: "cascade" })
      .notNull(),
    cohortId: varchar("cohort_id", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for competencyTemplateCohorts - used to validate API requests
const baseSchema = createSelectSchema(competencyTemplateCohorts).omit(
  timestamps,
);

export const insertCompetencyTemplateCohortSchema = createInsertSchema(
  competencyTemplateCohorts,
).omit(timestamps);
export const insertCompetencyTemplateCohortParams = baseSchema
  .extend({
    competencyTemplateId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyTemplateCohortSchema = baseSchema;
export const updateCompetencyTemplateCohortParams = baseSchema
  .extend({
    competencyTemplateId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const competencyTemplateCohortIdSchema = baseSchema.pick({ id: true });

// Types for competencyTemplateCohorts - used to type API request params and within Components
export type CompetencyTemplateCohort =
  typeof competencyTemplateCohorts.$inferSelect;
export type NewCompetencyTemplateCohort = z.infer<
  typeof insertCompetencyTemplateCohortSchema
>;
export type NewCompetencyTemplateCohortParams = z.infer<
  typeof insertCompetencyTemplateCohortParams
>;
export type UpdateCompetencyTemplateCohortParams = z.infer<
  typeof updateCompetencyTemplateCohortParams
>;
export type CompetencyTemplateCohortId = z.infer<
  typeof competencyTemplateCohortIdSchema
>["id"];

// this type infers the return from getCompetencyTemplateCohorts() - meaning it will include any joins
export type CompleteCompetencyTemplateCohort = Awaited<
  ReturnType<typeof getCompetencyTemplateCohorts>
>["competencyTemplateCohorts"][number];
