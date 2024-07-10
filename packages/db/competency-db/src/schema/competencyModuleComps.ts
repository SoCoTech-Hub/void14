import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { competencies } from "./competencies";

export const competencyModuleComps = pgTable(
  "competency_module_comps",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    cmId: varchar("cm_id", { length: 256 }),
    competencyId: varchar("competency_id", { length: 256 })
      .references(() => competencies.id, { onDelete: "cascade" })
      .notNull(),
    ruleOutcome: integer("rule_outcome"),
    sortOrder: integer("sort_order"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (competencyModuleComps) => {
    return {
      sortOrderIndex: uniqueIndex("sort_order_idx").on(
        competencyModuleComps.sortOrder,
      ),
    };
  },
);

// Schema for competencyModuleComps - used to validate API requests
const baseSchema = createSelectSchema(competencyModuleComps).omit(timestamps);

export const insertCompetencyModuleCompSchema = createInsertSchema(
  competencyModuleComps,
).omit(timestamps);
export const insertCompetencyModuleCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    ruleOutcome: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyModuleCompSchema = baseSchema;
export const updateCompetencyModuleCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    ruleOutcome: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyModuleCompIdSchema = baseSchema.pick({ id: true });

// Types for competencyModuleComps - used to type API request params and within Components
export type CompetencyModuleComp = typeof competencyModuleComps.$inferSelect;
export type NewCompetencyModuleComp = z.infer<
  typeof insertCompetencyModuleCompSchema
>;
export type NewCompetencyModuleCompParams = z.infer<
  typeof insertCompetencyModuleCompParams
>;
export type UpdateCompetencyModuleCompParams = z.infer<
  typeof updateCompetencyModuleCompParams
>;
export type CompetencyModuleCompId = z.infer<
  typeof competencyModuleCompIdSchema
>["id"];
