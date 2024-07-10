import { getAssignSubmissionOnlineTextById, getAssignSubmissionOnlineTexts } from "../api/assignSubmissionOnlineTexts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  assignSubmissionOnlineTextIdSchema,
  insertAssignSubmissionOnlineTextParams,
  updateAssignSubmissionOnlineTextParams,
} from "@soco/assignment-db/schema/assignSubmissionOnlineTexts";
import { createAssignSubmissionOnlineText, deleteAssignSubmissionOnlineText, updateAssignSubmissionOnlineText } from "../api/assignSubmissionOnlineTexts/mutations";

export const assignSubmissionOnlineTextsRouter =createTRPCRouter({
  getAssignSubmissionOnlineTexts: publicProcedure.query(async () => {
    return getAssignSubmissionOnlineTexts();
  }),
  getAssignSubmissionOnlineTextById: publicProcedure.input(assignSubmissionOnlineTextIdSchema).query(async ({ input }) => {
    return getAssignSubmissionOnlineTextById(input.id);
  }),
  createAssignSubmissionOnlineText: publicProcedure
    .input(insertAssignSubmissionOnlineTextParams)
    .mutation(async ({ input }) => {
      return createAssignSubmissionOnlineText(input);
    }),
  updateAssignSubmissionOnlineText: publicProcedure
    .input(updateAssignSubmissionOnlineTextParams)
    .mutation(async ({ input }) => {
      return updateAssignSubmissionOnlineText(input.id, input);
    }),
  deleteAssignSubmissionOnlineText: publicProcedure
    .input(assignSubmissionOnlineTextIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignSubmissionOnlineText(input.id);
    }),
});
