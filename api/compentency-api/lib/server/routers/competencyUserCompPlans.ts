import { getCompetencyUserCompPlanById, getCompetencyUserCompPlans } from "@/lib/api/competencyUserCompPlans/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyUserCompPlanIdSchema,
  insertCompetencyUserCompPlanParams,
  updateCompetencyUserCompPlanParams,
} from "@/lib/db/schema/competencyUserCompPlans";
import { createCompetencyUserCompPlan, deleteCompetencyUserCompPlan, updateCompetencyUserCompPlan } from "@/lib/api/competencyUserCompPlans/mutations";

export const competencyUserCompPlansRouter = router({
  getCompetencyUserCompPlans: publicProcedure.query(async () => {
    return getCompetencyUserCompPlans();
  }),
  getCompetencyUserCompPlanById: publicProcedure.input(competencyUserCompPlanIdSchema).query(async ({ input }) => {
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
