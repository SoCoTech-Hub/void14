import {
  createQtypeEssayOption,
  deleteQtypeEssayOption,
  updateQtypeEssayOption,
} from "../api/qtypeEssayOptions/mutations";
import {
  getQtypeEssayOptionById,
  getQtypeEssayOptions,
} from "../api/qtypeEssayOptions/queries";
import {
  insertQtypeEssayOptionParams,
  qtypeEssayOptionIdSchema,
  updateQtypeEssayOptionParams,
} from "../db/schema/qtypeEssayOptions";
import { publicProcedure, router } from "../server/trpc";

export const qtypeEssayOptionsRouter = router({
  getQtypeEssayOptions: publicProcedure.query(async () => {
    return getQtypeEssayOptions();
  }),
  getQtypeEssayOptionById: publicProcedure
    .input(qtypeEssayOptionIdSchema)
    .query(async ({ input }) => {
      return getQtypeEssayOptionById(input.id);
    }),
  createQtypeEssayOption: publicProcedure
    .input(insertQtypeEssayOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeEssayOption(input);
    }),
  updateQtypeEssayOption: publicProcedure
    .input(updateQtypeEssayOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeEssayOption(input.id, input);
    }),
  deleteQtypeEssayOption: publicProcedure
    .input(qtypeEssayOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeEssayOption(input.id);
    }),
});
