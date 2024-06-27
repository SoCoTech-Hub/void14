import { getChoiceById, getChoices } from "@/lib/api/choices/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  choiceIdSchema,
  insertChoiceParams,
  updateChoiceParams,
} from "@/lib/db/schema/choices";
import { createChoice, deleteChoice, updateChoice } from "@/lib/api/choices/mutations";

export const choicesRouter = router({
  getChoices: publicProcedure.query(async () => {
    return getChoices();
  }),
  getChoiceById: publicProcedure.input(choiceIdSchema).query(async ({ input }) => {
    return getChoiceById(input.id);
  }),
  createChoice: publicProcedure
    .input(insertChoiceParams)
    .mutation(async ({ input }) => {
      return createChoice(input);
    }),
  updateChoice: publicProcedure
    .input(updateChoiceParams)
    .mutation(async ({ input }) => {
      return updateChoice(input.id, input);
    }),
  deleteChoice: publicProcedure
    .input(choiceIdSchema)
    .mutation(async ({ input }) => {
      return deleteChoice(input.id);
    }),
});
