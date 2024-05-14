import { sql } from "drizzle-orm";
import { varchar, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { competencies } from "./competencies"
import { type getCompetencyUserComps } from "@/lib/api/competencyUserComps/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const competencyUserComps = pgTable('competency_user_comps', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  competencyId: varchar("competency_id", { length: 256 }).references(() => competencies.id, { onDelete: "cascade" }).notNull(),
  grade: integer("grade"),
  proficiency: integer("proficiency"),
  reviewerId: varchar("reviewer_id", { length: 256 }),
  status: integer("status"),
  userModified: varchar("user_id", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for competencyUserComps - used to validate API requests
const baseSchema = createSelectSchema(competencyUserComps).omit(timestamps)

export const insertCompetencyUserCompSchema = createInsertSchema(competencyUserComps).omit(timestamps);
export const insertCompetencyUserCompParams = baseSchema.extend({
  competencyId: z.coerce.string().min(1),
  grade: z.coerce.number(),
  proficiency: z.coerce.number(),
  status: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateCompetencyUserCompSchema = baseSchema;
export const updateCompetencyUserCompParams = baseSchema.extend({
  competencyId: z.coerce.string().min(1),
  grade: z.coerce.number(),
  proficiency: z.coerce.number(),
  status: z.coerce.number()
}).omit({ 
  userId: true
});
export const competencyUserCompIdSchema = baseSchema.pick({ id: true });

// Types for competencyUserComps - used to type API request params and within Components
export type CompetencyUserComp = typeof competencyUserComps.$inferSelect;
export type NewCompetencyUserComp = z.infer<typeof insertCompetencyUserCompSchema>;
export type NewCompetencyUserCompParams = z.infer<typeof insertCompetencyUserCompParams>;
export type UpdateCompetencyUserCompParams = z.infer<typeof updateCompetencyUserCompParams>;
export type CompetencyUserCompId = z.infer<typeof competencyUserCompIdSchema>["id"];
    
// this type infers the return from getCompetencyUserComps() - meaning it will include any joins
export type CompleteCompetencyUserComp = Awaited<ReturnType<typeof getCompetencyUserComps>>["competencyUserComps"][number];

