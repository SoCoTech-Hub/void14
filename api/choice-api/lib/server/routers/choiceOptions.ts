import { getChoiceOptionById, getChoiceOptions } from "@/lib/api/choiceOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  choiceOptionIdSchema,
  insertChoiceOptionParams,
  updateChoiceOptionParams,
} from "@/lib/db/schema/choiceOptions";
import { createChoiceOption, deleteChoiceOption, updateChoiceOption } from "@/lib/api/choiceOptions/mutations";

export const choiceOptionsRouter = router({
  getChoiceOptions: publicProcedure.query(async () => {
    return getChoiceOptions();
  }),
  getChoiceOptionById: publicProcedure.input(choiceOptionIdSchema).query(async ({ input }) => {
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
