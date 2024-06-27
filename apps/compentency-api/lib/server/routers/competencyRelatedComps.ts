import { getCompetencyRelatedCompById, getCompetencyRelatedComps } from "@/lib/api/competencyRelatedComps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyRelatedCompIdSchema,
  insertCompetencyRelatedCompParams,
  updateCompetencyRelatedCompParams,
} from "@/lib/db/schema/competencyRelatedComps";
import { createCompetencyRelatedComp, deleteCompetencyRelatedComp, updateCompetencyRelatedComp } from "@/lib/api/competencyRelatedComps/mutations";

export const competencyRelatedCompsRouter = router({
  getCompetencyRelatedComps: publicProcedure.query(async () => {
    return getCompetencyRelatedComps();
  }),
  getCompetencyRelatedCompById: publicProcedure.input(competencyRelatedCompIdSchema).query(async ({ input }) => {
    return getCompetencyRelatedCompById(input.id);
  }),
  createCompetencyRelatedComp: publicProcedure
    .input(insertCompetencyRelatedCompParams)
    .mutation(async ({ input }) => {
      return createCompetencyRelatedComp(input);
    }),
  updateCompetencyRelatedComp: publicProcedure
    .input(updateCompetencyRelatedCompParams)
    .mutation(async ({ input }) => {
      return updateCompetencyRelatedComp(input.id, input);
    }),
  deleteCompetencyRelatedComp: publicProcedure
    .input(competencyRelatedCompIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyRelatedComp(input.id);
    }),
});
