import {
  createBadgeExternalBackpack,
  deleteBadgeExternalBackpack,
  updateBadgeExternalBackpack,
} from "../api/badgeExternalBackpacks/mutations";
import {
  getBadgeExternalBackpackById,
  getBadgeExternalBackpacks,
} from "../api/badgeExternalBackpacks/queries";
import {
  badgeExternalBackpackIdSchema,
  insertBadgeExternalBackpackParams,
  updateBadgeExternalBackpackParams,
} from "../db/schema/badgeExternalBackpacks";
import { publicProcedure, router } from "../server/trpc";

export const badgeExternalBackpacksRouter = router({
  getBadgeExternalBackpacks: publicProcedure.query(async () => {
    return getBadgeExternalBackpacks();
  }),
  getBadgeExternalBackpackById: publicProcedure
    .input(badgeExternalBackpackIdSchema)
    .query(async ({ input }) => {
      return getBadgeExternalBackpackById(input.id);
    }),
  createBadgeExternalBackpack: publicProcedure
    .input(insertBadgeExternalBackpackParams)
    .mutation(async ({ input }) => {
      return createBadgeExternalBackpack(input);
    }),
  updateBadgeExternalBackpack: publicProcedure
    .input(updateBadgeExternalBackpackParams)
    .mutation(async ({ input }) => {
      return updateBadgeExternalBackpack(input.id, input);
    }),
  deleteBadgeExternalBackpack: publicProcedure
    .input(badgeExternalBackpackIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeExternalBackpack(input.id);
    }),
});
