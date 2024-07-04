import {
  createGrouping,
  deleteGrouping,
  updateGrouping,
} from "../api/groupings/mutations";
import { getGroupingById, getGroupings } from "../api/groupings/queries";
import {
  groupingIdSchema,
  insertGroupingParams,
  updateGroupingParams,
} from "../db/schema/groupings";
import { publicProcedure, router } from "../server/trpc";

export const groupingsRouter = router({
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
