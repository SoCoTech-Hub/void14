import { getQtypeShortanswerOptionById, getQtypeShortanswerOptions } from "@/lib/api/qtypeShortanswerOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeShortanswerOptionIdSchema,
  insertQtypeShortanswerOptionParams,
  updateQtypeShortanswerOptionParams,
} from "@/lib/db/schema/qtypeShortanswerOptions";
import { createQtypeShortanswerOption, deleteQtypeShortanswerOption, updateQtypeShortanswerOption } from "@/lib/api/qtypeShortanswerOptions/mutations";

export const qtypeShortanswerOptionsRouter = router({
  getQtypeShortanswerOptions: publicProcedure.query(async () => {
    return getQtypeShortanswerOptions();
  }),
  getQtypeShortanswerOptionById: publicProcedure.input(qtypeShortanswerOptionIdSchema).query(async ({ input }) => {
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
