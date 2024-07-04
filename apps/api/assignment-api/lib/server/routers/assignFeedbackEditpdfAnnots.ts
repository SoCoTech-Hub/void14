import {
  createAssignFeedbackEditpdfAnnot,
  deleteAssignFeedbackEditpdfAnnot,
  updateAssignFeedbackEditpdfAnnot,
} from "../api/assignFeedbackEditpdfAnnots/mutations";
import {
  getAssignFeedbackEditpdfAnnotById,
  getAssignFeedbackEditpdfAnnots,
} from "../api/assignFeedbackEditpdfAnnots/queries";
import {
  assignFeedbackEditpdfAnnotIdSchema,
  insertAssignFeedbackEditpdfAnnotParams,
  updateAssignFeedbackEditpdfAnnotParams,
} from "../db/schema/assignFeedbackEditpdfAnnots";
import { publicProcedure, router } from "../server/trpc";

export const assignFeedbackEditpdfAnnotsRouter = router({
  getAssignFeedbackEditpdfAnnots: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfAnnots();
  }),
  getAssignFeedbackEditpdfAnnotById: publicProcedure
    .input(assignFeedbackEditpdfAnnotIdSchema)
    .query(async ({ input }) => {
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
