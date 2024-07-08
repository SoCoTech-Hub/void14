
import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const competencyEvidences = pgTable("competency_evidences", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  action: integer("action"),
  actionUserId: varchar("action_user_id", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  desca: text("desca"),
  descComponent: varchar("desc_component", { length: 256 }),
  descIdentifier: varchar("desc_identifier", { length: 256 }),
  grade: integer("grade"),
  note: text("note"),
  url: varchar("url", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userCompetencyId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for competencyEvidences - used to validate API requests
const baseSchema = createSelectSchema(competencyEvidences).omit(timestamps);

export const insertCompetencyEvidenceSchema =
  createInsertSchema(competencyEvidences).omit(timestamps);
export const insertCompetencyEvidenceParams = baseSchema
  .extend({
    action: z.coerce.number(),
    grade: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyEvidenceSchema = baseSchema;
export const updateCompetencyEvidenceParams = baseSchema
  .extend({
    action: z.coerce.number(),
    grade: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyEvidenceIdSchema = baseSchema.pick({ id: true });

// Types for competencyEvidences - used to type API request params and within Components
export type CompetencyEvidence = typeof competencyEvidences.$inferSelect;
export type NewCompetencyEvidence = z.infer<
  typeof insertCompetencyEvidenceSchema
>;
export type NewCompetencyEvidenceParams = z.infer<
  typeof insertCompetencyEvidenceParams
>;
export type UpdateCompetencyEvidenceParams = z.infer<
  typeof updateCompetencyEvidenceParams
>;
export type CompetencyEvidenceId = z.infer<
  typeof competencyEvidenceIdSchema
>["id"];


