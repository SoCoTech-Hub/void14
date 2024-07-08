import { getMassMailListById, getMassMailLists } from "../api/massMailLists/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  massMailListIdSchema,
  insertMassMailListParams,
  updateMassMailListParams,
} from "@soco/mass-mail-db/schema/massMailLists";
import { createMassMailList, deleteMassMailList, updateMassMailList } from "../api/massMailLists/mutations";

export const massMailListsRouter =createTRPCRouter({
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
