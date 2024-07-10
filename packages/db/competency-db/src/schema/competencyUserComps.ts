import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { competencies } from "./competencies";

export const competencyUserComps = pgTable("competency_user_comps", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  competencyId: varchar("competency_id", { length: 256 })
    .references(() => competencies.id, { onDelete: "cascade" })
    .notNull(),
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
const baseSchema = createSelectSchema(competencyUserComps).omit(timestamps);

export const insertCompetencyUserCompSchema =
  createInsertSchema(competencyUserComps).omit(timestamps);
export const insertCompetencyUserCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    grade: z.coerce.number(),
    proficiency: z.coerce.number(),
    status: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyUserCompSchema = baseSchema;
export const updateCompetencyUserCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    grade: z.coerce.number(),
    proficiency: z.coerce.number(),
    status: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyUserCompIdSchema = baseSchema.pick({ id: true });

// Types for competencyUserComps - used to type API request params and within Components
export type CompetencyUserComp = typeof competencyUserComps.$inferSelect;
export type NewCompetencyUserComp = z.infer<
  typeof insertCompetencyUserCompSchema
>;
export type NewCompetencyUserCompParams = z.infer<
  typeof insertCompetencyUserCompParams
>;
export type UpdateCompetencyUserCompParams = z.infer<
  typeof updateCompetencyUserCompParams
>;
export type CompetencyUserCompId = z.infer<
  typeof competencyUserCompIdSchema
>["id"];
