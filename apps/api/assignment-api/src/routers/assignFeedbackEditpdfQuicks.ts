import {
  assignFeedbackEditpdfQuickIdSchema,
  insertAssignFeedbackEditpdfQuickParams,
  updateAssignFeedbackEditpdfQuickParams,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfQuicks";

import {
  createAssignFeedbackEditpdfQuick,
  deleteAssignFeedbackEditpdfQuick,
  updateAssignFeedbackEditpdfQuick,
} from "../api/assignFeedbackEditpdfQuicks/mutations";
import {
  getAssignFeedbackEditpdfQuickById,
  getAssignFeedbackEditpdfQuicks,
} from "../api/assignFeedbackEditpdfQuicks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignFeedbackEditpdfQuicksRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getAssignFeedbackEditpdfQuicks: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfQuicks();
  }),
  getAssignFeedbackEditpdfQuickById: publicProcedure
    .input(assignFeedbackEditpdfQuickIdSchema)
    .query(async ({ input }) => {
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
