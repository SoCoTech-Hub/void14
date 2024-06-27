import { getAssignSubmissionFileById, getAssignSubmissionFiles } from "@/lib/api/assignSubmissionFiles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignSubmissionFileIdSchema,
  insertAssignSubmissionFileParams,
  updateAssignSubmissionFileParams,
} from "@/lib/db/schema/assignSubmissionFiles";
import { createAssignSubmissionFile, deleteAssignSubmissionFile, updateAssignSubmissionFile } from "@/lib/api/assignSubmissionFiles/mutations";

export const assignSubmissionFilesRouter = router({
  getAssignSubmissionFiles: publicProcedure.query(async () => {
    return getAssignSubmissionFiles();
  }),
  getAssignSubmissionFileById: publicProcedure.input(assignSubmissionFileIdSchema).query(async ({ input }) => {
    return getAssignSubmissionFileById(input.id);
  }),
  createAssignSubmissionFile: publicProcedure
    .input(insertAssignSubmissionFileParams)
    .mutation(async ({ input }) => {
      return createAssignSubmissionFile(input);
    }),
  updateAssignSubmissionFile: publicProcedure
    .input(updateAssignSubmissionFileParams)
    .mutation(async ({ input }) => {
      return updateAssignSubmissionFile(input.id, input);
    }),
  deleteAssignSubmissionFile: publicProcedure
    .input(assignSubmissionFileIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignSubmissionFile(input.id);
    }),
});
