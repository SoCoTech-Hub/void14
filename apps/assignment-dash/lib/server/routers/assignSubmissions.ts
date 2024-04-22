import { getAssignSubmissionById, getAssignSubmissions } from "@/lib/api/assignSubmissions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignSubmissionIdSchema,
  insertAssignSubmissionParams,
  updateAssignSubmissionParams,
} from "@/lib/db/schema/assignSubmissions";
import { createAssignSubmission, deleteAssignSubmission, updateAssignSubmission } from "@/lib/api/assignSubmissions/mutations";

export const assignSubmissionsRouter = router({
  getAssignSubmissions: publicProcedure.query(async () => {
    return getAssignSubmissions();
  }),
  getAssignSubmissionById: publicProcedure.input(assignSubmissionIdSchema).query(async ({ input }) => {
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
