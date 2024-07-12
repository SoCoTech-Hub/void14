import {
  assignSubmissionIdSchema,
  insertAssignSubmissionParams,
  updateAssignSubmissionParams,
} from "@soco/assignment-db/schema/assignSubmissions";

import {
  createAssignSubmission,
  deleteAssignSubmission,
  updateAssignSubmission,
} from "../api/assignSubmissions/mutations";
import {
  getAssignSubmissionById,
  getAssignSubmissions,
} from "../api/assignSubmissions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignSubmissionsRouter = createTRPCRouter({
  getAssignSubmissions: publicProcedure.query(async () => {
    return getAssignSubmissions();
  }),
  getAssignSubmissionById: publicProcedure
    .input(assignSubmissionIdSchema)
    .query(async ({ input }) => {
      return getAssignSubmissionById(input.id);
    }),
  createAssignSubmission: publicProcedure
    .input(insertAssignSubmissionParams)
    .mutation(async ({ input }) => {
      return createAssignSubmission(input);
    }),
  updateAssignSubmission: publicProcedure
    .input(updateAssignSubmissionParams)
    .mutation(async ({ input }) => {
      return updateAssignSubmission(input.id, input);
    }),
  deleteAssignSubmission: publicProcedure
    .input(assignSubmissionIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignSubmission(input.id);
    }),
});
