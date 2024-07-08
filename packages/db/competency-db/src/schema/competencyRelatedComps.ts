
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { competencies } from "./competencies";

export const competencyRelatedComps = pgTable("competency_related_comps", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  competencyId: varchar("competency_id", { length: 256 })
    .references(() => competencies.id, { onDelete: "cascade" })
    .notNull(),
  relatedCompetencyId: varchar("related_competency_id", {
    length: 256,
  }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for competencyRelatedComps - used to validate API requests
const baseSchema = createSelectSchema(competencyRelatedComps).omit(timestamps);

export const insertCompetencyRelatedCompSchema = createInsertSchema(
  competencyRelatedComps,
).omit(timestamps);
export const insertCompetencyRelatedCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyRelatedCompSchema = baseSchema;
export const updateCompetencyRelatedCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const competencyRelatedCompIdSchema = baseSchema.pick({ id: true });

// Types for competencyRelatedComps - used to type API request params and within Components
export type CompetencyRelatedComp = typeof competencyRelatedComps.$inferSelect;
export type NewCompetencyRelatedComp = z.infer<
  typeof insertCompetencyRelatedCompSchema
>;
export type NewCompetencyRelatedCompParams = z.infer<
  typeof insertCompetencyRelatedCompParams
>;
export type UpdateCompetencyRelatedCompParams = z.infer<
  typeof updateCompetencyRelatedCompParams
>;
export type CompetencyRelatedCompId = z.infer<
  typeof competencyRelatedCompIdSchema
>["id"];


