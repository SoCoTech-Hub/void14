import {
  choiceOptionIdSchema,
  insertChoiceOptionParams,
  updateChoiceOptionParams,
} from "@soco/choice-db/schema/choiceOptions";

import {
  createChoiceOption,
  deleteChoiceOption,
  updateChoiceOption,
} from "../api/choiceOptions/mutations";
import {
  getChoiceOptionById,
  getChoiceOptions,
} from "../api/choiceOptions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const choiceOptionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getChoiceOptions: publicProcedure.query(async () => {
      return getChoiceOptions();
    }),
    getChoiceOptionById: publicProcedure
      .input(choiceOptionIdSchema)
      .query(async ({ input }) => {
        return getChoiceOptionById(input.id);
      }),
    createChoiceOption: publicProcedure
      .input(insertChoiceOptionParams)
      .mutation(async ({ input }) => {
        return createChoiceOption(input);
      }),
    updateChoiceOption: publicProcedure
      .input(updateChoiceOptionParams)
      .mutation(async ({ input }) => {
        return updateChoiceOption(input.id, input);
      }),
    deleteChoiceOption: publicProcedure
      .input(choiceOptionIdSchema)
      .mutation(async ({ input }) => {
        return deleteChoiceOption(input.id);
      }),
  });
