import {
  createMassMailList,
  deleteMassMailList,
  updateMassMailList,
} from "../api/massMailLists/mutations";
import {
  getMassMailListById,
  getMassMailLists,
} from "../api/massMailLists/queries";
import {
  insertMassMailListParams,
  massMailListIdSchema,
  updateMassMailListParams,
} from "../db/schema/massMailLists";
import { publicProcedure, router } from "../server/trpc";

export const massMailListsRouter = router({
  getMassMailLists: publicProcedure.query(async () => {
    return getMassMailLists();
  }),
  getMassMailListById: publicProcedure
    .input(massMailListIdSchema)
    .query(async ({ input }) => {
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
