import {
  assignFeedbackEditpdfCmntIdSchema,
  insertAssignFeedbackEditpdfCmntParams,
  updateAssignFeedbackEditpdfCmntParams,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfCmnts";

import {
  createAssignFeedbackEditpdfCmnt,
  deleteAssignFeedbackEditpdfCmnt,
  updateAssignFeedbackEditpdfCmnt,
} from "../api/assignFeedbackEditpdfCmnts/mutations";
import {
  getAssignFeedbackEditpdfCmntById,
  getAssignFeedbackEditpdfCmnts,
} from "../api/assignFeedbackEditpdfCmnts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignFeedbackEditpdfCmntsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getAssignFeedbackEditpdfCmnts: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfCmnts();
  }),
  getAssignFeedbackEditpdfCmntById: publicProcedure
    .input(assignFeedbackEditpdfCmntIdSchema)
    .query(async ({ input }) => {
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
