import { getCompetencyModuleCompById, getCompetencyModuleComps } from "@/lib/api/competencyModuleComps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyModuleCompIdSchema,
  insertCompetencyModuleCompParams,
  updateCompetencyModuleCompParams,
} from "@/lib/db/schema/competencyModuleComps";
import { createCompetencyModuleComp, deleteCompetencyModuleComp, updateCompetencyModuleComp } from "@/lib/api/competencyModuleComps/mutations";

export const competencyModuleCompsRouter = router({
  getCompetencyModuleComps: publicProcedure.query(async () => {
    return getCompetencyModuleComps();
  }),
  getCompetencyModuleCompById: publicProcedure.input(competencyModuleCompIdSchema).query(async ({ input }) => {
    return getCompetencyModuleCompById(input.id);
  }),
  createCompetencyModuleComp: publicProcedure
    .input(insertCompetencyModuleCompParams)
    .mutation(async ({ input }) => {
      return createCompetencyModuleComp(input);
    }),
  updateCompetencyModuleComp: publicProcedure
    .input(updateCompetencyModuleCompParams)
    .mutation(async ({ input }) => {
      return updateCompetencyModuleComp(input.id, input);
    }),
  deleteCompetencyModuleComp: publicProcedure
    .input(competencyModuleCompIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyModuleComp(input.id);
    }),
});
