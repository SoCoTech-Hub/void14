import { getCompetencyPlanById, getCompetencyPlans } from "@/lib/api/competencyPlans/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyPlanIdSchema,
  insertCompetencyPlanParams,
  updateCompetencyPlanParams,
} from "@/lib/db/schema/competencyPlans";
import { createCompetencyPlan, deleteCompetencyPlan, updateCompetencyPlan } from "@/lib/api/competencyPlans/mutations";

export const competencyPlansRouter = router({
  getCompetencyPlans: publicProcedure.query(async () => {
    return getCompetencyPlans();
  }),
  getCompetencyPlanById: publicProcedure.input(competencyPlanIdSchema).query(async ({ input }) => {
    return getCompetencyPlanById(input.id);
  }),
  createCompetencyPlan: publicProcedure
    .input(insertCompetencyPlanParams)
    .mutation(async ({ input }) => {
      return createCompetencyPlan(input);
    }),
  updateCompetencyPlan: publicProcedure
    .input(updateCompetencyPlanParams)
    .mutation(async ({ input }) => {
      return updateCompetencyPlan(input.id, input);
    }),
  deleteCompetencyPlan: publicProcedure
    .input(competencyPlanIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyPlan(input.id);
    }),
});
