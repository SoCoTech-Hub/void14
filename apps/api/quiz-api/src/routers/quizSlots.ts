import { getQuizSlotById, getQuizSlots } from "../api/quizSlots/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  quizSlotIdSchema,
  insertQuizSlotParams,
  updateQuizSlotParams,
} from "@soco/quiz-db/schema/quizSlots";
import { createQuizSlot, deleteQuizSlot, updateQuizSlot } from "../api/quizSlots/mutations";

export const quizSlotsRouter =createTRPCRouter({
  getQuizSlots: publicProcedure.query(async () => {
    return getQuizSlots();
  }),
  getQuizSlotById: publicProcedure.input(quizSlotIdSchema).query(async ({ input }) => {
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
