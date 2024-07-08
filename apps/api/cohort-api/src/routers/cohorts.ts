import { getCohortById, getCohorts } from "../api/cohorts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  cohortIdSchema,
  insertCohortParams,
  updateCohortParams,
} from "@soco/cohort-db/schema/cohorts";
import { createCohort, deleteCohort, updateCohort } from "../api/cohorts/mutations";

export const cohortsRouter =createTRPCRouter({
  getCohorts: publicProcedure.query(async () => {
    return getCohorts();
  }),
  getCohortById: publicProcedure.input(cohortIdSchema).query(async ({ input }) => {
    return getCohortById(input.id);
  }),
  createCohort: publicProcedure
    .input(insertCohortParams)
    .mutation(async ({ input }) => {
      return createCohort(input);
    }),
  updateCohort: publicProcedure
    .input(updateCohortParams)
    .mutation(async ({ input }) => {
      return updateCohort(input.id, input);
    }),
  deleteCohort: publicProcedure
    .input(cohortIdSchema)
    .mutation(async ({ input }) => {
      return deleteCohort(input.id);
    }),
});
