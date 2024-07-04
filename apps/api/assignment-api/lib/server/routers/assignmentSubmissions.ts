import {
  createAssignmentSubmission,
  deleteAssignmentSubmission,
  updateAssignmentSubmission,
} from "../api/assignmentSubmissions/mutations";
import {
  getAssignmentSubmissionById,
  getAssignmentSubmissions,
} from "../api/assignmentSubmissions/queries";
import {
  assignmentSubmissionIdSchema,
  insertAssignmentSubmissionParams,
  updateAssignmentSubmissionParams,
} from "../db/schema/assignmentSubmissions";
import { publicProcedure, router } from "../server/trpc";

export const assignmentSubmissionsRouter = router({
  getAssignmentSubmissions: publicProcedure.query(async () => {
    return getAssignmentSubmissions();
  }),
  getAssignmentSubmissionById: publicProcedure
    .input(assignmentSubmissionIdSchema)
    .query(async ({ input }) => {
      return getAssignmentSubmissionById(input.id);
    }),
  createAssignmentSubmission: publicProcedure
    .input(insertAssignmentSubmissionParams)
    .mutation(async ({ input }) => {
      return createAssignmentSubmission(input);
    }),
  updateAssignmentSubmission: publicProcedure
    .input(updateAssignmentSubmissionParams)
    .mutation(async ({ input }) => {
      return updateAssignmentSubmission(input.id, input);
    }),
  deleteAssignmentSubmission: publicProcedure
    .input(assignmentSubmissionIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignmentSubmission(input.id);
    }),
});
