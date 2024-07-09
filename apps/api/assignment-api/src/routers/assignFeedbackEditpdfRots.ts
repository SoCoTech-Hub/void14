import {
  assignFeedbackEditpdfRotIdSchema,
  insertAssignFeedbackEditpdfRotParams,
  updateAssignFeedbackEditpdfRotParams,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfRots";

import {
  createAssignFeedbackEditpdfRot,
  deleteAssignFeedbackEditpdfRot,
  updateAssignFeedbackEditpdfRot,
} from "../api/assignFeedbackEditpdfRots/mutations";
import {
  getAssignFeedbackEditpdfRotById,
  getAssignFeedbackEditpdfRots,
} from "../api/assignFeedbackEditpdfRots/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignFeedbackEditpdfRotsRouter = createTRPCRouter({
  getAssignFeedbackEditpdfRots: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfRots();
  }),
  getAssignFeedbackEditpdfRotById: publicProcedure
    .input(assignFeedbackEditpdfRotIdSchema)
    .query(async ({ input }) => {
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
