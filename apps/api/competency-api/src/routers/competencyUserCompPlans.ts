import {
  competencyUserCompPlanIdSchema,
  insertCompetencyUserCompPlanParams,
  updateCompetencyUserCompPlanParams,
} from "@soco/competency-db/schema/competencyUserCompPlans";

import {
  createCompetencyUserCompPlan,
  deleteCompetencyUserCompPlan,
  updateCompetencyUserCompPlan,
} from "../api/competencyUserCompPlans/mutations";
import {
  getCompetencyUserCompPlanById,
  getCompetencyUserCompPlans,
} from "../api/competencyUserCompPlans/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyUserCompPlansRouter = createTRPCRouter({
  getCompetencyUserCompPlans: publicProcedure.query(async () => {
    return getCompetencyUserCompPlans();
  }),
  getCompetencyUserCompPlanById: publicProcedure
    .input(competencyUserCompPlanIdSchema)
    .query(async ({ input }) => {
      return getCompetencyUserCompPlanById(input.id);
    }),
  createCompetencyUserCompPlan: publicProcedure
    .input(insertCompetencyUserCompPlanParams)
    .mutation(async ({ input }) => {
      return createCompetencyUserCompPlan(input);
    }),
  updateCompetencyUserCompPlan: publicProcedure
    .input(updateCompetencyUserCompPlanParams)
    .mutation(async ({ input }) => {
      return updateCompetencyUserCompPlan(input.id, input);
    }),
  deleteCompetencyUserCompPlan: publicProcedure
    .input(competencyUserCompPlanIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyUserCompPlan(input.id);
    }),
});
