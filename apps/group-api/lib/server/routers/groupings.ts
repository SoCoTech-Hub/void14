import { getGroupingById, getGroupings } from "@/lib/api/groupings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  groupingIdSchema,
  insertGroupingParams,
  updateGroupingParams,
} from "@/lib/db/schema/groupings";
import { createGrouping, deleteGrouping, updateGrouping } from "@/lib/api/groupings/mutations";

export const groupingsRouter = router({
  getGroupings: publicProcedure.query(async () => {
    return getGroupings();
  }),
  getGroupingById: publicProcedure.input(groupingIdSchema).query(async ({ input }) => {
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
