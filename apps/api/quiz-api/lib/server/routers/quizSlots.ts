import {
  createQuizSlot,
  deleteQuizSlot,
  updateQuizSlot,
} from "../api/quizSlots/mutations";
import { getQuizSlotById, getQuizSlots } from "../api/quizSlots/queries";
import {
  insertQuizSlotParams,
  quizSlotIdSchema,
  updateQuizSlotParams,
} from "../db/schema/quizSlots";
import { publicProcedure, router } from "../server/trpc";

export const quizSlotsRouter = router({
  getQuizSlots: publicProcedure.query(async () => {
    return getQuizSlots();
  }),
  getQuizSlotById: publicProcedure
    .input(quizSlotIdSchema)
    .query(async ({ input }) => {
      return getQuizSlotById(input.id);
    }),
  createQuizSlot: publicProcedure
    .input(insertQuizSlotParams)
    .mutation(async ({ input }) => {
      return createQuizSlot(input);
    }),
  updateQuizSlot: publicProcedure
    .input(updateQuizSlotParams)
    .mutation(async ({ input }) => {
      return updateQuizSlot(input.id, input);
    }),
  deleteQuizSlot: publicProcedure
    .input(quizSlotIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizSlot(input.id);
    }),
});
