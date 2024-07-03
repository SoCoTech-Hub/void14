import { getLtiSubmissionById, getLtiSubmissions } from "@/lib/api/ltiSubmissions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  ltiSubmissionIdSchema,
  insertLtiSubmissionParams,
  updateLtiSubmissionParams,
} from "@/lib/db/schema/ltiSubmissions";
import { createLtiSubmission, deleteLtiSubmission, updateLtiSubmission } from "@/lib/api/ltiSubmissions/mutations";

export const ltiSubmissionsRouter = router({
  getLtiSubmissions: publicProcedure.query(async () => {
    return getLtiSubmissions();
  }),
  getLtiSubmissionById: publicProcedure.input(ltiSubmissionIdSchema).query(async ({ input }) => {
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
