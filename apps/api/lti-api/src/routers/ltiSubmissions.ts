import {
  insertLtiSubmissionParams,
  ltiSubmissionIdSchema,
  updateLtiSubmissionParams,
} from "@soco/lti-db/schema/ltiSubmissions";

import {
  createLtiSubmission,
  deleteLtiSubmission,
  updateLtiSubmission,
} from "../api/ltiSubmissions/mutations";
import {
  getLtiSubmissionById,
  getLtiSubmissions,
} from "../api/ltiSubmissions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ltiSubmissionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getLtiSubmissions: publicProcedure.query(async () => {
      return getLtiSubmissions();
    }),
    getLtiSubmissionById: publicProcedure
      .input(ltiSubmissionIdSchema)
      .query(async ({ input }) => {
        return getLtiSubmissionById(input.id);
      }),
    createLtiSubmission: publicProcedure
      .input(insertLtiSubmissionParams)
      .mutation(async ({ input }) => {
        return createLtiSubmission(input);
      }),
    updateLtiSubmission: publicProcedure
      .input(updateLtiSubmissionParams)
      .mutation(async ({ input }) => {
        return updateLtiSubmission(input.id, input);
      }),
    deleteLtiSubmission: publicProcedure
      .input(ltiSubmissionIdSchema)
      .mutation(async ({ input }) => {
        return deleteLtiSubmission(input.id);
      }),
  });
