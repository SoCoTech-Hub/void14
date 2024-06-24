import { getQuizSlotById, getQuizSlots } from "@/lib/api/quizSlots/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizSlotIdSchema,
  insertQuizSlotParams,
  updateQuizSlotParams,
} from "@/lib/db/schema/quizSlots";
import { createQuizSlot, deleteQuizSlot, updateQuizSlot } from "@/lib/api/quizSlots/mutations";

export const quizSlotsRouter = router({
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
