import {
  createChoiceOption,
  deleteChoiceOption,
  updateChoiceOption,
} from "../api/choiceOptions/mutations";
import {
  getChoiceOptionById,
  getChoiceOptions,
} from "../api/choiceOptions/queries";
import {
  choiceOptionIdSchema,
  insertChoiceOptionParams,
  updateChoiceOptionParams,
} from "../db/schema/choiceOptions";
import { publicProcedure, router } from "../server/trpc";

export const choiceOptionsRouter = router({
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
