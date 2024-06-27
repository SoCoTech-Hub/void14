import { getAssignFeedbackFileById, getAssignFeedbackFiles } from "@/lib/api/assignFeedbackFiles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignFeedbackFileIdSchema,
  insertAssignFeedbackFileParams,
  updateAssignFeedbackFileParams,
} from "@/lib/db/schema/assignFeedbackFiles";
import { createAssignFeedbackFile, deleteAssignFeedbackFile, updateAssignFeedbackFile } from "@/lib/api/assignFeedbackFiles/mutations";

export const assignFeedbackFilesRouter = router({
  getAssignFeedbackFiles: publicProcedure.query(async () => {
    return getAssignFeedbackFiles();
  }),
  getAssignFeedbackFileById: publicProcedure.input(assignFeedbackFileIdSchema).query(async ({ input }) => {
    return getAssignFeedbackFileById(input.id);
  }),
  createAssignFeedbackFile: publicProcedure
    .input(insertAssignFeedbackFileParams)
    .mutation(async ({ input }) => {
      return createAssignFeedbackFile(input);
    }),
  updateAssignFeedbackFile: publicProcedure
    .input(updateAssignFeedbackFileParams)
    .mutation(async ({ input }) => {
      return updateAssignFeedbackFile(input.id, input);
    }),
  deleteAssignFeedbackFile: publicProcedure
    .input(assignFeedbackFileIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignFeedbackFile(input.id);
    }),
});
