import { getAssignmentSubmissionById, getAssignmentSubmissions } from "@/lib/api/assignmentSubmissions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignmentSubmissionIdSchema,
  insertAssignmentSubmissionParams,
  updateAssignmentSubmissionParams,
} from "@/lib/db/schema/assignmentSubmissions";
import { createAssignmentSubmission, deleteAssignmentSubmission, updateAssignmentSubmission } from "@/lib/api/assignmentSubmissions/mutations";

export const assignmentSubmissionsRouter = router({
  getAssignmentSubmissions: publicProcedure.query(async () => {
    return getAssignmentSubmissions();
  }),
  getAssignmentSubmissionById: publicProcedure.input(assignmentSubmissionIdSchema).query(async ({ input }) => {
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
