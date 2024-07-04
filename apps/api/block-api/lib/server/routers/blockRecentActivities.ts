import {
  createBlockRecentActivity,
  deleteBlockRecentActivity,
  updateBlockRecentActivity,
} from "../api/blockRecentActivities/mutations";
import {
  getBlockRecentActivities,
  getBlockRecentActivityById,
} from "../api/blockRecentActivities/queries";
import {
  blockRecentActivityIdSchema,
  insertBlockRecentActivityParams,
  updateBlockRecentActivityParams,
} from "../db/schema/blockRecentActivities";
import { publicProcedure, router } from "../server/trpc";

export const blockRecentActivitiesRouter = router({
  getBlockRecentActivities: publicProcedure.query(async () => {
    return getBlockRecentActivities();
  }),
  getBlockRecentActivityById: publicProcedure
    .input(blockRecentActivityIdSchema)
    .query(async ({ input }) => {
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
