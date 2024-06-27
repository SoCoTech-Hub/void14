import { getAssignFeedbackEditpdfAnnotById, getAssignFeedbackEditpdfAnnots } from "@/lib/api/assignFeedbackEditpdfAnnots/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignFeedbackEditpdfAnnotIdSchema,
  insertAssignFeedbackEditpdfAnnotParams,
  updateAssignFeedbackEditpdfAnnotParams,
} from "@/lib/db/schema/assignFeedbackEditpdfAnnots";
import { createAssignFeedbackEditpdfAnnot, deleteAssignFeedbackEditpdfAnnot, updateAssignFeedbackEditpdfAnnot } from "@/lib/api/assignFeedbackEditpdfAnnots/mutations";

export const assignFeedbackEditpdfAnnotsRouter = router({
  getAssignFeedbackEditpdfAnnots: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfAnnots();
  }),
  getAssignFeedbackEditpdfAnnotById: publicProcedure.input(assignFeedbackEditpdfAnnotIdSchema).query(async ({ input }) => {
    return getAssignFeedbackEditpdfAnnotById(input.id);
  }),
  createAssignFeedbackEditpdfAnnot: publicProcedure
    .input(insertAssignFeedbackEditpdfAnnotParams)
    .mutation(async ({ input }) => {
      return createAssignFeedbackEditpdfAnnot(input);
    }),
  updateAssignFeedbackEditpdfAnnot: publicProcedure
    .input(updateAssignFeedbackEditpdfAnnotParams)
    .mutation(async ({ input }) => {
      return updateAssignFeedbackEditpdfAnnot(input.id, input);
    }),
  deleteAssignFeedbackEditpdfAnnot: publicProcedure
    .input(assignFeedbackEditpdfAnnotIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignFeedbackEditpdfAnnot(input.id);
    }),
});
