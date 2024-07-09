import {
  competencyRelatedCompIdSchema,
  insertCompetencyRelatedCompParams,
  updateCompetencyRelatedCompParams,
} from "@soco/competency-db/schema/competencyRelatedComps";

import {
  createCompetencyRelatedComp,
  deleteCompetencyRelatedComp,
  updateCompetencyRelatedComp,
} from "../api/competencyRelatedComps/mutations";
import {
  getCompetencyRelatedCompById,
  getCompetencyRelatedComps,
} from "../api/competencyRelatedComps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyRelatedCompsRouter = createTRPCRouter({
  getCompetencyRelatedComps: publicProcedure.query(async () => {
    return getCompetencyRelatedComps();
  }),
  getCompetencyRelatedCompById: publicProcedure
    .input(competencyRelatedCompIdSchema)
    .query(async ({ input }) => {
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
