import {
  createAssignSubmission,
  deleteAssignSubmission,
  updateAssignSubmission,
} from "../api/assignSubmissions/mutations";
import {
  getAssignSubmissionById,
  getAssignSubmissions,
} from "../api/assignSubmissions/queries";
import {
  assignSubmissionIdSchema,
  insertAssignSubmissionParams,
  updateAssignSubmissionParams,
} from "../db/schema/assignSubmissions";
import { publicProcedure, router } from "../server/trpc";

export const assignSubmissionsRouter = router({
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
