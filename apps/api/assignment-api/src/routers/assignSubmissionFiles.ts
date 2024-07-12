import {
  assignSubmissionFileIdSchema,
  insertAssignSubmissionFileParams,
  updateAssignSubmissionFileParams,
} from "@soco/assignment-db/schema/assignSubmissionFiles";

import {
  createAssignSubmissionFile,
  deleteAssignSubmissionFile,
  updateAssignSubmissionFile,
} from "../api/assignSubmissionFiles/mutations";
import {
  getAssignSubmissionFileById,
  getAssignSubmissionFiles,
} from "../api/assignSubmissionFiles/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignSubmissionFilesRouter = createTRPCRouter({
  getAssignSubmissionFiles: publicProcedure.query(async () => {
    return getAssignSubmissionFiles();
  }),
  getAssignSubmissionFileById: publicProcedure
    .input(assignSubmissionFileIdSchema)
    .query(async ({ input }) => {
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
