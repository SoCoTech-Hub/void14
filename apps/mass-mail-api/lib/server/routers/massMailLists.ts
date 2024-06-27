import { getMassMailListById, getMassMailLists } from "@/lib/api/massMailLists/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  massMailListIdSchema,
  insertMassMailListParams,
  updateMassMailListParams,
} from "@/lib/db/schema/massMailLists";
import { createMassMailList, deleteMassMailList, updateMassMailList } from "@/lib/api/massMailLists/mutations";

export const massMailListsRouter = router({
  getMassMailLists: publicProcedure.query(async () => {
    return getMassMailLists();
  }),
  getMassMailListById: publicProcedure.input(massMailListIdSchema).query(async ({ input }) => {
    return getMassMailListById(input.id);
  }),
  createMassMailList: publicProcedure
    .input(insertMassMailListParams)
    .mutation(async ({ input }) => {
      return createMassMailList(input);
    }),
  updateMassMailList: publicProcedure
    .input(updateMassMailListParams)
    .mutation(async ({ input }) => {
      return updateMassMailList(input.id, input);
    }),
  deleteMassMailList: publicProcedure
    .input(massMailListIdSchema)
    .mutation(async ({ input }) => {
      return deleteMassMailList(input.id);
    }),
});
