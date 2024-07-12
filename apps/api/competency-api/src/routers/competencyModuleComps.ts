import {
  competencyModuleCompIdSchema,
  insertCompetencyModuleCompParams,
  updateCompetencyModuleCompParams,
} from "@soco/competency-db/schema/competencyModuleComps";

import {
  createCompetencyModuleComp,
  deleteCompetencyModuleComp,
  updateCompetencyModuleComp,
} from "../api/competencyModuleComps/mutations";
import {
  getCompetencyModuleCompById,
  getCompetencyModuleComps,
} from "../api/competencyModuleComps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyModuleCompsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getCompetencyModuleComps: publicProcedure.query(async () => {
      return getCompetencyModuleComps();
    }),
    getCompetencyModuleCompById: publicProcedure
      .input(competencyModuleCompIdSchema)
      .query(async ({ input }) => {
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
