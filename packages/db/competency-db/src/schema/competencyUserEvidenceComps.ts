import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { competencies } from "./competencies";
import { competencyUserEvidences } from "./competencyUserEvidences";

export const competencyUserEvidenceComps = pgTable(
  "competency_user_evidence_comps",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    competencyId: varchar("competency_id", { length: 256 })
      .references(() => competencies.id, { onDelete: "cascade" })
      .notNull(),
    competencyUserEvidenceId: varchar("competency_user_evidence_id", {
      length: 256,
    })
      .references(() => competencyUserEvidences.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for competencyUserEvidenceComps - used to validate API requests
const baseSchema = createSelectSchema(competencyUserEvidenceComps).omit(
  timestamps,
);

export const insertCompetencyUserEvidenceCompSchema = createInsertSchema(
  competencyUserEvidenceComps,
).omit(timestamps);
export const insertCompetencyUserEvidenceCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    competencyUserEvidenceId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyUserEvidenceCompSchema = baseSchema;
export const updateCompetencyUserEvidenceCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    competencyUserEvidenceId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const competencyUserEvidenceCompIdSchema = baseSchema.pick({ id: true });

// Types for competencyUserEvidenceComps - used to type API request params and within Components
export type CompetencyUserEvidenceComp =
  typeof competencyUserEvidenceComps.$inferSelect;
export type NewCompetencyUserEvidenceComp = z.infer<
  typeof insertCompetencyUserEvidenceCompSchema
>;
export type NewCompetencyUserEvidenceCompParams = z.infer<
  typeof insertCompetencyUserEvidenceCompParams
>;
export type UpdateCompetencyUserEvidenceCompParams = z.infer<
  typeof updateCompetencyUserEvidenceCompParams
>;
export type CompetencyUserEvidenceCompId = z.infer<
  typeof competencyUserEvidenceCompIdSchema
>["id"];
