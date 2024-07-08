import { getChoiceById, getChoices } from "../api/choices/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  choiceIdSchema,
  insertChoiceParams,
  updateChoiceParams,
} from "@soco/choice-db/schema/choices";
import { createChoice, deleteChoice, updateChoice } from "../api/choices/mutations";

export const choicesRouter =createTRPCRouter({
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
