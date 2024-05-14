import { sql } from "drizzle-orm";
import { varchar, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getCompetencyUserEvidences } from "@/lib/api/competencyUserEvidences/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const competencyUserEvidences = pgTable('competency_user_evidences', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  descriptionFormat: varchar("description_format", { length: 256 }),
  url: varchar("url", { length: 256 }),
  userModified: varchar("user_id", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for competencyUserEvidences - used to validate API requests
const baseSchema = createSelectSchema(competencyUserEvidences).omit(timestamps)

export const insertCompetencyUserEvidenceSchema = createInsertSchema(competencyUserEvidences).omit(timestamps);
export const insertCompetencyUserEvidenceParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateCompetencyUserEvidenceSchema = baseSchema;
export const updateCompetencyUserEvidenceParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const competencyUserEvidenceIdSchema = baseSchema.pick({ id: true });

// Types for competencyUserEvidences - used to type API request params and within Components
export type CompetencyUserEvidence = typeof competencyUserEvidences.$inferSelect;
export type NewCompetencyUserEvidence = z.infer<typeof insertCompetencyUserEvidenceSchema>;
export type NewCompetencyUserEvidenceParams = z.infer<typeof insertCompetencyUserEvidenceParams>;
export type UpdateCompetencyUserEvidenceParams = z.infer<typeof updateCompetencyUserEvidenceParams>;
export type CompetencyUserEvidenceId = z.infer<typeof competencyUserEvidenceIdSchema>["id"];
    
// this type infers the return from getCompetencyUserEvidences() - meaning it will include any joins
export type CompleteCompetencyUserEvidence = Awaited<ReturnType<typeof getCompetencyUserEvidences>>["competencyUserEvidences"][number];

