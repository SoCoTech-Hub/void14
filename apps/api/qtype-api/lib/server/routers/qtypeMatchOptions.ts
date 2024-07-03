import { getQtypeMatchOptionById, getQtypeMatchOptions } from "@/lib/api/qtypeMatchOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeMatchOptionIdSchema,
  insertQtypeMatchOptionParams,
  updateQtypeMatchOptionParams,
} from "@/lib/db/schema/qtypeMatchOptions";
import { createQtypeMatchOption, deleteQtypeMatchOption, updateQtypeMatchOption } from "@/lib/api/qtypeMatchOptions/mutations";

export const qtypeMatchOptionsRouter = router({
  getQtypeMatchOptions: publicProcedure.query(async () => {
    return getQtypeMatchOptions();
  }),
  getQtypeMatchOptionById: publicProcedure.input(qtypeMatchOptionIdSchema).query(async ({ input }) => {
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
