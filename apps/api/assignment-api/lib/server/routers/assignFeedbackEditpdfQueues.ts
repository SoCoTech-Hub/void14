import { getAssignFeedbackEditpdfQueueById, getAssignFeedbackEditpdfQueues } from "@/lib/api/assignFeedbackEditpdfQueues/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignFeedbackEditpdfQueueIdSchema,
  insertAssignFeedbackEditpdfQueueParams,
  updateAssignFeedbackEditpdfQueueParams,
} from "@/lib/db/schema/assignFeedbackEditpdfQueues";
import { createAssignFeedbackEditpdfQueue, deleteAssignFeedbackEditpdfQueue, updateAssignFeedbackEditpdfQueue } from "@/lib/api/assignFeedbackEditpdfQueues/mutations";

export const assignFeedbackEditpdfQueuesRouter = router({
  getAssignFeedbackEditpdfQueues: publicProcedure.query(async () => {
    return getAssignFeedbackEditpdfQueues();
  }),
  getAssignFeedbackEditpdfQueueById: publicProcedure.input(assignFeedbackEditpdfQueueIdSchema).query(async ({ input }) => {
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
