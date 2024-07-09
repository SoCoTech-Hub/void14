import {
  competencyTemplateCompIdSchema,
  insertCompetencyTemplateCompParams,
  updateCompetencyTemplateCompParams,
} from "@soco/competency-db/schema/competencyTemplateComps";

import {
  createCompetencyTemplateComp,
  deleteCompetencyTemplateComp,
  updateCompetencyTemplateComp,
} from "../api/competencyTemplateComps/mutations";
import {
  getCompetencyTemplateCompById,
  getCompetencyTemplateComps,
} from "../api/competencyTemplateComps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyTemplateCompsRouter = createTRPCRouter({
  getCompetencyTemplateComps: publicProcedure.query(async () => {
    return getCompetencyTemplateComps();
  }),
  getCompetencyTemplateCompById: publicProcedure
    .input(competencyTemplateCompIdSchema)
    .query(async ({ input }) => {
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
