import { getAssignFeedbackEditpdfQuickById, getAssignFeedbackEditpdfQuicks } from "@/lib/api/assignFeedbackEditpdfQuicks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignFeedbackEditpdfQuickIdSchema,
  insertAssignFeedbackEditpdfQuickParams,
  updateAssignFeedbackEditpdfQuickParams,
} from "@/lib/db/schema/assignFeedbackEditpdfQuicks";
import { createAssignFeedbackEditpdfQuick, deleteAssignFeedbackEditpdfQuick, updateAssignFeedbackEditpdfQuick } from "@/lib/api/assignFeedbackEditpdfQuicks/mutations";

export const assignFeedbackEditpdfQuicksRouter = router({
  getAssignFeedbackEditpdfQuicks: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfQuicks();
  }),
  getAssignFeedbackEditpdfQuickById: publicProcedure.input(assignFeedbackEditpdfQuickIdSchema).query(async ({ input }) => {
    return getAssignFeedbackEditpdfQuickById(input.id);
  }),
  createAssignFeedbackEditpdfQuick: publicProcedure
    .input(insertAssignFeedbackEditpdfQuickParams)
    .mutation(async ({ input }) => {
      return createAssignFeedbackEditpdfQuick(input);
    }),
  updateAssignFeedbackEditpdfQuick: publicProcedure
    .input(updateAssignFeedbackEditpdfQuickParams)
    .mutation(async ({ input }) => {
      return updateAssignFeedbackEditpdfQuick(input.id, input);
    }),
  deleteAssignFeedbackEditpdfQuick: publicProcedure
    .input(assignFeedbackEditpdfQuickIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignFeedbackEditpdfQuick(input.id);
    }),
});
