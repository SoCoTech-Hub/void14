import {
  createQtypeShortanswerOption,
  deleteQtypeShortanswerOption,
  updateQtypeShortanswerOption,
} from "../api/qtypeShortanswerOptions/mutations";
import {
  getQtypeShortanswerOptionById,
  getQtypeShortanswerOptions,
} from "../api/qtypeShortanswerOptions/queries";
import {
  insertQtypeShortanswerOptionParams,
  qtypeShortanswerOptionIdSchema,
  updateQtypeShortanswerOptionParams,
} from "../db/schema/qtypeShortanswerOptions";
import { publicProcedure, router } from "../server/trpc";

export const qtypeShortanswerOptionsRouter = router({
  getQtypeShortanswerOptions: publicProcedure.query(async () => {
    return getQtypeShortanswerOptions();
  }),
  getQtypeShortanswerOptionById: publicProcedure
    .input(qtypeShortanswerOptionIdSchema)
    .query(async ({ input }) => {
      return getQtypeShortanswerOptionById(input.id);
    }),
  createQtypeShortanswerOption: publicProcedure
    .input(insertQtypeShortanswerOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeShortanswerOption(input);
    }),
  updateQtypeShortanswerOption: publicProcedure
    .input(updateQtypeShortanswerOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeShortanswerOption(input.id, input);
    }),
  deleteQtypeShortanswerOption: publicProcedure
    .input(qtypeShortanswerOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeShortanswerOption(input.id);
    }),
});
