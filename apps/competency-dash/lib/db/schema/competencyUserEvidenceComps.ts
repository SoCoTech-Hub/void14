import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { competencies } from "./competencies"
import { competencyUserEvidences } from "./competencyUserEvidences"
import { type getCompetencyUserEvidenceComps } from "@/lib/api/competencyUserEvidenceComps/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const competencyUserEvidenceComps = pgTable('competency_user_evidence_comps', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  competencyId: varchar("competency_id", { length: 256 }).references(() => competencies.id, { onDelete: "cascade" }).notNull(),
  competencyUserEvidenceId: varchar("competency_user_evidence_id", { length: 256 }).references(() => competencyUserEvidences.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for competencyUserEvidenceComps - used to validate API requests
const baseSchema = createSelectSchema(competencyUserEvidenceComps).omit(timestamps)

export const insertCompetencyUserEvidenceCompSchema = createInsertSchema(competencyUserEvidenceComps).omit(timestamps);
export const insertCompetencyUserEvidenceCompParams = baseSchema.extend({
  competencyId: z.coerce.string().min(1),
  competencyUserEvidenceId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateCompetencyUserEvidenceCompSchema = baseSchema;
export const updateCompetencyUserEvidenceCompParams = baseSchema.extend({
  competencyId: z.coerce.string().min(1),
  competencyUserEvidenceId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const competencyUserEvidenceCompIdSchema = baseSchema.pick({ id: true });

// Types for competencyUserEvidenceComps - used to type API request params and within Components
export type CompetencyUserEvidenceComp = typeof competencyUserEvidenceComps.$inferSelect;
export type NewCompetencyUserEvidenceComp = z.infer<typeof insertCompetencyUserEvidenceCompSchema>;
export type NewCompetencyUserEvidenceCompParams = z.infer<typeof insertCompetencyUserEvidenceCompParams>;
export type UpdateCompetencyUserEvidenceCompParams = z.infer<typeof updateCompetencyUserEvidenceCompParams>;
export type CompetencyUserEvidenceCompId = z.infer<typeof competencyUserEvidenceCompIdSchema>["id"];
    
// this type infers the return from getCompetencyUserEvidenceComps() - meaning it will include any joins
export type CompleteCompetencyUserEvidenceComp = Awaited<ReturnType<typeof getCompetencyUserEvidenceComps>>["competencyUserEvidenceComps"][number];

