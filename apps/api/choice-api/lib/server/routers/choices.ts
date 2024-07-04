import {
  createChoice,
  deleteChoice,
  updateChoice,
} from "../api/choices/mutations";
import { getChoiceById, getChoices } from "../api/choices/queries";
import {
  choiceIdSchema,
  insertChoiceParams,
  updateChoiceParams,
} from "../db/schema/choices";
import { publicProcedure, router } from "../server/trpc";

export const choicesRouter = router({
  getChoices: publicProcedure.query(async () => {
    return getChoices();
  }),
  getChoiceById: publicProcedure
    .input(choiceIdSchema)
    .query(async ({ input }) => {
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
