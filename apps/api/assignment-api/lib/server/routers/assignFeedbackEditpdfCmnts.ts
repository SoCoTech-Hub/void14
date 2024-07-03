import { getAssignFeedbackEditpdfCmntById, getAssignFeedbackEditpdfCmnts } from "@/lib/api/assignFeedbackEditpdfCmnts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignFeedbackEditpdfCmntIdSchema,
  insertAssignFeedbackEditpdfCmntParams,
  updateAssignFeedbackEditpdfCmntParams,
} from "@/lib/db/schema/assignFeedbackEditpdfCmnts";
import { createAssignFeedbackEditpdfCmnt, deleteAssignFeedbackEditpdfCmnt, updateAssignFeedbackEditpdfCmnt } from "@/lib/api/assignFeedbackEditpdfCmnts/mutations";

export const assignFeedbackEditpdfCmntsRouter = router({
  getAssignFeedbackEditpdfCmnts: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfCmnts();
  }),
  getAssignFeedbackEditpdfCmntById: publicProcedure.input(assignFeedbackEditpdfCmntIdSchema).query(async ({ input }) => {
    return getAssignFeedbackEditpdfCmntById(input.id);
  }),
  createAssignFeedbackEditpdfCmnt: publicProcedure
    .input(insertAssignFeedbackEditpdfCmntParams)
    .mutation(async ({ input }) => {
      return createAssignFeedbackEditpdfCmnt(input);
    }),
  updateAssignFeedbackEditpdfCmnt: publicProcedure
    .input(updateAssignFeedbackEditpdfCmntParams)
    .mutation(async ({ input }) => {
      return updateAssignFeedbackEditpdfCmnt(input.id, input);
    }),
  deleteAssignFeedbackEditpdfCmnt: publicProcedure
    .input(assignFeedbackEditpdfCmntIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignFeedbackEditpdfCmnt(input.id);
    }),
});
