import {
  insertMassMailListParams,
  massMailListIdSchema,
  updateMassMailListParams,
} from "@soco/mass-mail-db/schema/massMailLists";

import {
  createMassMailList,
  deleteMassMailList,
  updateMassMailList,
} from "../api/massMailLists/mutations";
import {
  getMassMailListById,
  getMassMailLists,
} from "../api/massMailLists/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const massMailListsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
