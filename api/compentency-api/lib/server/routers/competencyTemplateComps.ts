import { getCompetencyTemplateCompById, getCompetencyTemplateComps } from "@/lib/api/competencyTemplateComps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyTemplateCompIdSchema,
  insertCompetencyTemplateCompParams,
  updateCompetencyTemplateCompParams,
} from "@/lib/db/schema/competencyTemplateComps";
import { createCompetencyTemplateComp, deleteCompetencyTemplateComp, updateCompetencyTemplateComp } from "@/lib/api/competencyTemplateComps/mutations";

export const competencyTemplateCompsRouter = router({
  getCompetencyTemplateComps: publicProcedure.query(async () => {
    return getCompetencyTemplateComps();
  }),
  getCompetencyTemplateCompById: publicProcedure.input(competencyTemplateCompIdSchema).query(async ({ input }) => {
    return getCompetencyTemplateCompById(input.id);
  }),
  createCompetencyTemplateComp: publicProcedure
    .input(insertCompetencyTemplateCompParams)
    .mutation(async ({ input }) => {
      return createCompetencyTemplateComp(input);
    }),
  updateCompetencyTemplateComp: publicProcedure
    .input(updateCompetencyTemplateCompParams)
    .mutation(async ({ input }) => {
      return updateCompetencyTemplateComp(input.id, input);
    }),
  deleteCompetencyTemplateComp: publicProcedure
    .input(competencyTemplateCompIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyTemplateComp(input.id);
    }),
});
