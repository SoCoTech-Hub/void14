import {
  h5pactivityAttemptsResultIdSchema,
  insertH5pactivityAttemptsResultParams,
  updateH5pactivityAttemptsResultParams,
} from "@soco/h5p-db/schema/h5pactivityAttemptsResults";

import {
  createH5pactivityAttemptsResult,
  deleteH5pactivityAttemptsResult,
  updateH5pactivityAttemptsResult,
} from "../api/h5pactivityAttemptsResults/mutations";
import {
  getH5pactivityAttemptsResultById,
  getH5pactivityAttemptsResults,
} from "../api/h5pactivityAttemptsResults/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const h5pactivityAttemptsResultsRouter = createTRPCRouter({
  getH5pactivityAttemptsResults: publicProcedure.query(async () => {
    return getH5pactivityAttemptsResults();
  }),
  getH5pactivityAttemptsResultById: publicProcedure
    .input(h5pactivityAttemptsResultIdSchema)
    .query(async ({ input }) => {
      return getH5pactivityAttemptsResultById(input.id);
    }),
  createH5pactivityAttemptsResult: publicProcedure
    .input(insertH5pactivityAttemptsResultParams)
    .mutation(async ({ input }) => {
      return createH5pactivityAttemptsResult(input);
    }),
  updateH5pactivityAttemptsResult: publicProcedure
    .input(updateH5pactivityAttemptsResultParams)
    .mutation(async ({ input }) => {
      return updateH5pactivityAttemptsResult(input.id, input);
    }),
  deleteH5pactivityAttemptsResult: publicProcedure
    .input(h5pactivityAttemptsResultIdSchema)
    .mutation(async ({ input }) => {
      return deleteH5pactivityAttemptsResult(input.id);
    }),
});
