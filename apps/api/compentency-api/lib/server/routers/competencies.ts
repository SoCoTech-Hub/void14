import {
  createCompetency,
  deleteCompetency,
  updateCompetency,
} from "../api/competencies/mutations";
import {
  getCompetencies,
  getCompetencyById,
} from "../api/competencies/queries";
import {
  competencyIdSchema,
  insertCompetencyParams,
  updateCompetencyParams,
} from "../db/schema/competencies";
import { publicProcedure, router } from "../server/trpc";

export const competenciesRouter = router({
  getCompetencies: publicProcedure.query(async () => {
    return getCompetencies();
  }),
  getCompetencyById: publicProcedure
    .input(competencyIdSchema)
    .query(async ({ input }) => {
      return getCompetencyById(input.id);
    }),
  createCompetency: publicProcedure
    .input(insertCompetencyParams)
    .mutation(async ({ input }) => {
      return createCompetency(input);
    }),
  updateCompetency: publicProcedure
    .input(updateCompetencyParams)
    .mutation(async ({ input }) => {
      return updateCompetency(input.id, input);
    }),
  deleteCompetency: publicProcedure
    .input(competencyIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetency(input.id);
    }),
});
