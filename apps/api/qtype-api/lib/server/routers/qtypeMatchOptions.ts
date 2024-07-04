import {
  createQtypeMatchOption,
  deleteQtypeMatchOption,
  updateQtypeMatchOption,
} from "../api/qtypeMatchOptions/mutations";
import {
  getQtypeMatchOptionById,
  getQtypeMatchOptions,
} from "../api/qtypeMatchOptions/queries";
import {
  insertQtypeMatchOptionParams,
  qtypeMatchOptionIdSchema,
  updateQtypeMatchOptionParams,
} from "../db/schema/qtypeMatchOptions";
import { publicProcedure, router } from "../server/trpc";

export const qtypeMatchOptionsRouter = router({
  getQtypeMatchOptions: publicProcedure.query(async () => {
    return getQtypeMatchOptions();
  }),
  getQtypeMatchOptionById: publicProcedure
    .input(qtypeMatchOptionIdSchema)
    .query(async ({ input }) => {
      return getQtypeMatchOptionById(input.id);
    }),
  createQtypeMatchOption: publicProcedure
    .input(insertQtypeMatchOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeMatchOption(input);
    }),
  updateQtypeMatchOption: publicProcedure
    .input(updateQtypeMatchOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeMatchOption(input.id, input);
    }),
  deleteQtypeMatchOption: publicProcedure
    .input(qtypeMatchOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeMatchOption(input.id);
    }),
});
