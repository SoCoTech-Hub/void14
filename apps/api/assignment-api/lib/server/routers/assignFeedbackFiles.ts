import {
  createAssignFeedbackFile,
  deleteAssignFeedbackFile,
  updateAssignFeedbackFile,
} from "../api/assignFeedbackFiles/mutations";
import {
  getAssignFeedbackFileById,
  getAssignFeedbackFiles,
} from "../api/assignFeedbackFiles/queries";
import {
  assignFeedbackFileIdSchema,
  insertAssignFeedbackFileParams,
  updateAssignFeedbackFileParams,
} from "../db/schema/assignFeedbackFiles";
import { publicProcedure, router } from "../server/trpc";

export const assignFeedbackFilesRouter = router({
  getAssignFeedbackFiles: publicProcedure.query(async () => {
    return getAssignFeedbackFiles();
  }),
  getAssignFeedbackFileById: publicProcedure
    .input(assignFeedbackFileIdSchema)
    .query(async ({ input }) => {
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
