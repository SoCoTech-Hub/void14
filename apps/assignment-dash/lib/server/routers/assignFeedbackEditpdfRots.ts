import { getAssignFeedbackEditpdfRotById, getAssignFeedbackEditpdfRots } from "@/lib/api/assignFeedbackEditpdfRots/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignFeedbackEditpdfRotIdSchema,
  insertAssignFeedbackEditpdfRotParams,
  updateAssignFeedbackEditpdfRotParams,
} from "@/lib/db/schema/assignFeedbackEditpdfRots";
import { createAssignFeedbackEditpdfRot, deleteAssignFeedbackEditpdfRot, updateAssignFeedbackEditpdfRot } from "@/lib/api/assignFeedbackEditpdfRots/mutations";

export const assignFeedbackEditpdfRotsRouter = router({
  getAssignFeedbackEditpdfRots: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfRots();
  }),
  getAssignFeedbackEditpdfRotById: publicProcedure.input(assignFeedbackEditpdfRotIdSchema).query(async ({ input }) => {
    return getAssignFeedbackEditpdfRotById(input.id);
  }),
  createAssignFeedbackEditpdfRot: publicProcedure
    .input(insertAssignFeedbackEditpdfRotParams)
    .mutation(async ({ input }) => {
      return createAssignFeedbackEditpdfRot(input);
    }),
  updateAssignFeedbackEditpdfRot: publicProcedure
    .input(updateAssignFeedbackEditpdfRotParams)
    .mutation(async ({ input }) => {
      return updateAssignFeedbackEditpdfRot(input.id, input);
    }),
  deleteAssignFeedbackEditpdfRot: publicProcedure
    .input(assignFeedbackEditpdfRotIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignFeedbackEditpdfRot(input.id);
    }),
});
