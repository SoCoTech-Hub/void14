import { getBadgeExternalBackpackById, getBadgeExternalBackpacks } from "@/lib/api/badgeExternalBackpacks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeExternalBackpackIdSchema,
  insertBadgeExternalBackpackParams,
  updateBadgeExternalBackpackParams,
} from "@/lib/db/schema/badgeExternalBackpacks";
import { createBadgeExternalBackpack, deleteBadgeExternalBackpack, updateBadgeExternalBackpack } from "@/lib/api/badgeExternalBackpacks/mutations";

export const badgeExternalBackpacksRouter = router({
  getBadgeExternalBackpacks: publicProcedure.query(async () => {
    return getBadgeExternalBackpacks();
  }),
  getBadgeExternalBackpackById: publicProcedure.input(badgeExternalBackpackIdSchema).query(async ({ input }) => {
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
