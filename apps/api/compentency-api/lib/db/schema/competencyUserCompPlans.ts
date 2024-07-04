import { type getCompetencyUserCompPlans } from "@/lib/api/competencyUserCompPlans/queries";
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

import { competencies } from "./competencies";
import { competencyPlans } from "./competencyPlans";

export const competencyUserCompPlans = pgTable(
  "competency_user_comp_plans",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    competencyId: varchar("competency_id", { length: 256 })
      .references(() => competencies.id, { onDelete: "cascade" })
      .notNull(),
    grade: integer("grade"),
    competencyPlanId: varchar("competency_plan_id", { length: 256 })
      .references(() => competencyPlans.id, { onDelete: "cascade" })
      .notNull(),
    proficiency: integer("proficiency"),
    sortOrder: integer("sort_order"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (competencyUserCompPlans) => {
    return {
      sortOrderIndex: uniqueIndex(
        "competency_user_comp_plans_sort_order_idx",
      ).on(competencyUserCompPlans.sortOrder),
    };
  },
);

// Schema for competencyUserCompPlans - used to validate API requests
const baseSchema = createSelectSchema(competencyUserCompPlans).omit(timestamps);

export const insertCompetencyUserCompPlanSchema = createInsertSchema(
  competencyUserCompPlans,
).omit(timestamps);
export const insertCompetencyUserCompPlanParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    grade: z.coerce.number(),
    competencyPlanId: z.coerce.string().min(1),
    proficiency: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyUserCompPlanSchema = baseSchema;
export const updateCompetencyUserCompPlanParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    grade: z.coerce.number(),
    competencyPlanId: z.coerce.string().min(1),
    proficiency: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyUserCompPlanIdSchema = baseSchema.pick({ id: true });

// Types for competencyUserCompPlans - used to type API request params and within Components
export type CompetencyUserCompPlan =
  typeof competencyUserCompPlans.$inferSelect;
export type NewCompetencyUserCompPlan = z.infer<
  typeof insertCompetencyUserCompPlanSchema
>;
export type NewCompetencyUserCompPlanParams = z.infer<
  typeof insertCompetencyUserCompPlanParams
>;
export type UpdateCompetencyUserCompPlanParams = z.infer<
  typeof updateCompetencyUserCompPlanParams
>;
export type CompetencyUserCompPlanId = z.infer<
  typeof competencyUserCompPlanIdSchema
>["id"];

// this type infers the return from getCompetencyUserCompPlans() - meaning it will include any joins
export type CompleteCompetencyUserCompPlan = Awaited<
  ReturnType<typeof getCompetencyUserCompPlans>
>["competencyUserCompPlans"][number];
