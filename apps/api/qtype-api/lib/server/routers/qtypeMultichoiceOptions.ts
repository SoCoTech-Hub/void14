import { getQtypeMultichoiceOptionById, getQtypeMultichoiceOptions } from "@/lib/api/qtypeMultichoiceOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeMultichoiceOptionIdSchema,
  insertQtypeMultichoiceOptionParams,
  updateQtypeMultichoiceOptionParams,
} from "@/lib/db/schema/qtypeMultichoiceOptions";
import { createQtypeMultichoiceOption, deleteQtypeMultichoiceOption, updateQtypeMultichoiceOption } from "@/lib/api/qtypeMultichoiceOptions/mutations";

export const qtypeMultichoiceOptionsRouter = router({
  getQtypeMultichoiceOptions: publicProcedure.query(async () => {
    return getQtypeMultichoiceOptions();
  }),
  getQtypeMultichoiceOptionById: publicProcedure.input(qtypeMultichoiceOptionIdSchema).query(async ({ input }) => {
    return getQtypeMultichoiceOptionById(input.id);
  }),
  createQtypeMultichoiceOption: publicProcedure
    .input(insertQtypeMultichoiceOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeMultichoiceOption(input);
    }),
  updateQtypeMultichoiceOption: publicProcedure
    .input(updateQtypeMultichoiceOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeMultichoiceOption(input.id, input);
    }),
  deleteQtypeMultichoiceOption: publicProcedure
    .input(qtypeMultichoiceOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeMultichoiceOption(input.id);
    }),
});
