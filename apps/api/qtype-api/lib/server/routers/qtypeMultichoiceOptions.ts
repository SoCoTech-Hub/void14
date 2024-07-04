import {
  createQtypeMultichoiceOption,
  deleteQtypeMultichoiceOption,
  updateQtypeMultichoiceOption,
} from "../api/qtypeMultichoiceOptions/mutations";
import {
  getQtypeMultichoiceOptionById,
  getQtypeMultichoiceOptions,
} from "../api/qtypeMultichoiceOptions/queries";
import {
  insertQtypeMultichoiceOptionParams,
  qtypeMultichoiceOptionIdSchema,
  updateQtypeMultichoiceOptionParams,
} from "../db/schema/qtypeMultichoiceOptions";
import { publicProcedure, router } from "../server/trpc";

export const qtypeMultichoiceOptionsRouter = router({
  getQtypeMultichoiceOptions: publicProcedure.query(async () => {
    return getQtypeMultichoiceOptions();
  }),
  getQtypeMultichoiceOptionById: publicProcedure
    .input(qtypeMultichoiceOptionIdSchema)
    .query(async ({ input }) => {
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
