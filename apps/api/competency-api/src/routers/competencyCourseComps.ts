import {
  competencyCourseCompIdSchema,
  insertCompetencyCourseCompParams,
  updateCompetencyCourseCompParams,
} from "@soco/competency-db/schema/competencyCourseComps";

import {
  createCompetencyCourseComp,
  deleteCompetencyCourseComp,
  updateCompetencyCourseComp,
} from "../api/competencyCourseComps/mutations";
import {
  getCompetencyCourseCompById,
  getCompetencyCourseComps,
} from "../api/competencyCourseComps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyCourseCompsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getCompetencyCourseComps: publicProcedure.query(async () => {
      return getCompetencyCourseComps();
    }),
    getCompetencyCourseCompById: publicProcedure
      .input(competencyCourseCompIdSchema)
      .query(async ({ input }) => {
        return getCompetencyCourseCompById(input.id);
      }),
    createCompetencyCourseComp: publicProcedure
      .input(insertCompetencyCourseCompParams)
      .mutation(async ({ input }) => {
        return createCompetencyCourseComp(input);
      }),
    updateCompetencyCourseComp: publicProcedure
      .input(updateCompetencyCourseCompParams)
      .mutation(async ({ input }) => {
        return updateCompetencyCourseComp(input.id, input);
      }),
    deleteCompetencyCourseComp: publicProcedure
      .input(competencyCourseCompIdSchema)
      .mutation(async ({ input }) => {
        return deleteCompetencyCourseComp(input.id);
      }),
  });
