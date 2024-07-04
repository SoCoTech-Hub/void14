import {
  createCompetencyCourseComp,
  deleteCompetencyCourseComp,
  updateCompetencyCourseComp,
} from "../api/competencyCourseComps/mutations";
import {
  getCompetencyCourseCompById,
  getCompetencyCourseComps,
} from "../api/competencyCourseComps/queries";
import {
  competencyCourseCompIdSchema,
  insertCompetencyCourseCompParams,
  updateCompetencyCourseCompParams,
} from "../db/schema/competencyCourseComps";
import { publicProcedure, router } from "../server/trpc";

export const competencyCourseCompsRouter = router({
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
