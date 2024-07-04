import {
  createQtypeRandomsamatchOption,
  deleteQtypeRandomsamatchOption,
  updateQtypeRandomsamatchOption,
} from "../api/qtypeRandomsamatchOptions/mutations";
import {
  getQtypeRandomsamatchOptionById,
  getQtypeRandomsamatchOptions,
} from "../api/qtypeRandomsamatchOptions/queries";
import {
  insertQtypeRandomsamatchOptionParams,
  qtypeRandomsamatchOptionIdSchema,
  updateQtypeRandomsamatchOptionParams,
} from "../db/schema/qtypeRandomsamatchOptions";
import { publicProcedure, router } from "../server/trpc";

export const qtypeRandomsamatchOptionsRouter = router({
  getQtypeRandomsamatchOptions: publicProcedure.query(async () => {
    return getQtypeRandomsamatchOptions();
  }),
  getQtypeRandomsamatchOptionById: publicProcedure
    .input(qtypeRandomsamatchOptionIdSchema)
    .query(async ({ input }) => {
      return getQtypeRandomsamatchOptionById(input.id);
    }),
  createQtypeRandomsamatchOption: publicProcedure
    .input(insertQtypeRandomsamatchOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeRandomsamatchOption(input);
    }),
  updateQtypeRandomsamatchOption: publicProcedure
    .input(updateQtypeRandomsamatchOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeRandomsamatchOption(input.id, input);
    }),
  deleteQtypeRandomsamatchOption: publicProcedure
    .input(qtypeRandomsamatchOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeRandomsamatchOption(input.id);
    }),
});
