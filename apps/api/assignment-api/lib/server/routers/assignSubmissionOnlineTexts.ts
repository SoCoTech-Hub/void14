import {
  createAssignSubmissionOnlineText,
  deleteAssignSubmissionOnlineText,
  updateAssignSubmissionOnlineText,
} from "../api/assignSubmissionOnlineTexts/mutations";
import {
  getAssignSubmissionOnlineTextById,
  getAssignSubmissionOnlineTexts,
} from "../api/assignSubmissionOnlineTexts/queries";
import {
  assignSubmissionOnlineTextIdSchema,
  insertAssignSubmissionOnlineTextParams,
  updateAssignSubmissionOnlineTextParams,
} from "../db/schema/assignSubmissionOnlineTexts";
import { publicProcedure, router } from "../server/trpc";

export const assignSubmissionOnlineTextsRouter = router({
  getAssignSubmissionOnlineTexts: publicProcedure.query(async () => {
    return getAssignSubmissionOnlineTexts();
  }),
  getAssignSubmissionOnlineTextById: publicProcedure
    .input(assignSubmissionOnlineTextIdSchema)
    .query(async ({ input }) => {
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
