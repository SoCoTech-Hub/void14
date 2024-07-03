import { getBlockRecentActivityById, getBlockRecentActivities } from "@/lib/api/blockRecentActivities/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blockRecentActivityIdSchema,
  insertBlockRecentActivityParams,
  updateBlockRecentActivityParams,
} from "@/lib/db/schema/blockRecentActivities";
import { createBlockRecentActivity, deleteBlockRecentActivity, updateBlockRecentActivity } from "@/lib/api/blockRecentActivities/mutations";

export const blockRecentActivitiesRouter = router({
  getBlockRecentActivities: publicProcedure.query(async () => {
    return getBlockRecentActivities();
  }),
  getBlockRecentActivityById: publicProcedure.input(blockRecentActivityIdSchema).query(async ({ input }) => {
    return getBlockRecentActivityById(input.id);
  }),
  createBlockRecentActivity: publicProcedure
    .input(insertBlockRecentActivityParams)
    .mutation(async ({ input }) => {
      return createBlockRecentActivity(input);
    }),
  updateBlockRecentActivity: publicProcedure
    .input(updateBlockRecentActivityParams)
    .mutation(async ({ input }) => {
      return updateBlockRecentActivity(input.id, input);
    }),
  deleteBlockRecentActivity: publicProcedure
    .input(blockRecentActivityIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlockRecentActivity(input.id);
    }),
});
