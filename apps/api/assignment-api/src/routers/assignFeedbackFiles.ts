import {
  assignFeedbackFileIdSchema,
  insertAssignFeedbackFileParams,
  updateAssignFeedbackFileParams,
} from "@soco/assignment-db/schema/assignFeedbackFiles";

import {
  createAssignFeedbackFile,
  deleteAssignFeedbackFile,
  updateAssignFeedbackFile,
} from "../api/assignFeedbackFiles/mutations";
import {
  getAssignFeedbackFileById,
  getAssignFeedbackFiles,
} from "../api/assignFeedbackFiles/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignFeedbackFilesRouter = createTRPCRouter({
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
