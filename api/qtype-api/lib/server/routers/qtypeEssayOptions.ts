import { getQtypeEssayOptionById, getQtypeEssayOptions } from "@/lib/api/qtypeEssayOptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeEssayOptionIdSchema,
  insertQtypeEssayOptionParams,
  updateQtypeEssayOptionParams,
} from "@/lib/db/schema/qtypeEssayOptions";
import { createQtypeEssayOption, deleteQtypeEssayOption, updateQtypeEssayOption } from "@/lib/api/qtypeEssayOptions/mutations";

export const qtypeEssayOptionsRouter = router({
  getQtypeEssayOptions: publicProcedure.query(async () => {
    return getQtypeEssayOptions();
  }),
  getQtypeEssayOptionById: publicProcedure.input(qtypeEssayOptionIdSchema).query(async ({ input }) => {
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
