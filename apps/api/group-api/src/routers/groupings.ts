import {
  groupingIdSchema,
  insertGroupingParams,
  updateGroupingParams,
} from "@soco/group-db/schema/groupings";

import {
  createGrouping,
  deleteGrouping,
  updateGrouping,
} from "../api/groupings/mutations";
import { getGroupingById, getGroupings } from "../api/groupings/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const groupingsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGroupings: publicProcedure.query(async () => {
      return getGroupings();
    }),
    getGroupingById: publicProcedure
      .input(groupingIdSchema)
      .query(async ({ input }) => {
        return getGroupingById(input.id);
      }),
    createGrouping: publicProcedure
      .input(insertGroupingParams)
      .mutation(async ({ input }) => {
        return createGrouping(input);
      }),
    updateGrouping: publicProcedure
      .input(updateGroupingParams)
      .mutation(async ({ input }) => {
        return updateGrouping(input.id, input);
      }),
    deleteGrouping: publicProcedure
      .input(groupingIdSchema)
      .mutation(async ({ input }) => {
        return deleteGrouping(input.id);
      }),
  });
