import { getAssignSubmissionOnlineTextById, getAssignSubmissionOnlineTexts } from "@/lib/api/assignSubmissionOnlineTexts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignSubmissionOnlineTextIdSchema,
  insertAssignSubmissionOnlineTextParams,
  updateAssignSubmissionOnlineTextParams,
} from "@/lib/db/schema/assignSubmissionOnlineTexts";
import { createAssignSubmissionOnlineText, deleteAssignSubmissionOnlineText, updateAssignSubmissionOnlineText } from "@/lib/api/assignSubmissionOnlineTexts/mutations";

export const assignSubmissionOnlineTextsRouter = router({
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
