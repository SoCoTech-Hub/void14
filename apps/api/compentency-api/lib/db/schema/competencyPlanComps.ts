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

import { nanoid, timestamps } from "@soco/utils";

import { type getCompetencyPlanComps } from "../api/competencyPlanComps/queries";
import { competencies } from "./competencies";
import { competencyPlans } from "./competencyPlans";

export const competencyPlanComps = pgTable(
  "competency_plan_comps",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    competencyId: varchar("competency_id", { length: 256 })
      .references(() => competencies.id, { onDelete: "cascade" })
      .notNull(),
    competencyPlanId: varchar("competency_plan_id", { length: 256 })
      .references(() => competencyPlans.id, { onDelete: "cascade" })
      .notNull(),
    sortOrder: integer("sort_order"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (competencyPlanComps) => {
    return {
      sortOrderIndex: uniqueIndex("competency_plan_comps_sort_order_idx").on(
        competencyPlanComps.sortOrder,
      ),
    };
  },
);

// Schema for competencyPlanComps - used to validate API requests
const baseSchema = createSelectSchema(competencyPlanComps).omit(timestamps);

export const insertCompetencyPlanCompSchema =
  createInsertSchema(competencyPlanComps).omit(timestamps);
export const insertCompetencyPlanCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    competencyPlanId: z.coerce.string().min(1),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyPlanCompSchema = baseSchema;
export const updateCompetencyPlanCompParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    competencyPlanId: z.coerce.string().min(1),
    sortOrder: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyPlanCompIdSchema = baseSchema.pick({ id: true });

// Types for competencyPlanComps - used to type API request params and within Components
export type CompetencyPlanComp = typeof competencyPlanComps.$inferSelect;
export type NewCompetencyPlanComp = z.infer<
  typeof insertCompetencyPlanCompSchema
>;
export type NewCompetencyPlanCompParams = z.infer<
  typeof insertCompetencyPlanCompParams
>;
export type UpdateCompetencyPlanCompParams = z.infer<
  typeof updateCompetencyPlanCompParams
>;
export type CompetencyPlanCompId = z.infer<
  typeof competencyPlanCompIdSchema
>["id"];

// this type infers the return from getCompetencyPlanComps() - meaning it will include any joins
export type CompleteCompetencyPlanComp = Awaited<
  ReturnType<typeof getCompetencyPlanComps>
>["competencyPlanComps"][number];
