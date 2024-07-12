import {
  assignFeedbackEditpdfQueueIdSchema,
  insertAssignFeedbackEditpdfQueueParams,
  updateAssignFeedbackEditpdfQueueParams,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfQueues";

import {
  createAssignFeedbackEditpdfQueue,
  deleteAssignFeedbackEditpdfQueue,
  updateAssignFeedbackEditpdfQueue,
} from "../api/assignFeedbackEditpdfQueues/mutations";
import {
  getAssignFeedbackEditpdfQueueById,
  getAssignFeedbackEditpdfQueues,
} from "../api/assignFeedbackEditpdfQueues/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignFeedbackEditpdfQueuesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getAssignFeedbackEditpdfQueues: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfQueues();
  }),
  getAssignFeedbackEditpdfQueueById: publicProcedure
    .input(assignFeedbackEditpdfQueueIdSchema)
    .query(async ({ input }) => {
      return getAssignFeedbackEditpdfQueueById(input.id);
    }),
  createAssignFeedbackEditpdfQueue: publicProcedure
    .input(insertAssignFeedbackEditpdfQueueParams)
    .mutation(async ({ input }) => {
      return createAssignFeedbackEditpdfQueue(input);
    }),
  updateAssignFeedbackEditpdfQueue: publicProcedure
    .input(updateAssignFeedbackEditpdfQueueParams)
    .mutation(async ({ input }) => {
      return updateAssignFeedbackEditpdfQueue(input.id, input);
    }),
  deleteAssignFeedbackEditpdfQueue: publicProcedure
    .input(assignFeedbackEditpdfQueueIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignFeedbackEditpdfQueue(input.id);
    }),
});
