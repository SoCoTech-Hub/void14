import { getQtypeRandomsamatchOptionById, getQtypeRandomsamatchOptions } from "@/lib/api/qtypeRandomsamatchOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeRandomsamatchOptionIdSchema,
  insertQtypeRandomsamatchOptionParams,
  updateQtypeRandomsamatchOptionParams,
} from "@/lib/db/schema/qtypeRandomsamatchOptions";
import { createQtypeRandomsamatchOption, deleteQtypeRandomsamatchOption, updateQtypeRandomsamatchOption } from "@/lib/api/qtypeRandomsamatchOptions/mutations";

export const qtypeRandomsamatchOptionsRouter = router({
  getQtypeRandomsamatchOptions: publicProcedure.query(async () => {
    return getQtypeRandomsamatchOptions();
  }),
  getQtypeRandomsamatchOptionById: publicProcedure.input(qtypeRandomsamatchOptionIdSchema).query(async ({ input }) => {
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
