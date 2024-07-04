import {
  createBadgeBackpack,
  deleteBadgeBackpack,
  updateBadgeBackpack,
} from "../api/badgeBackpacks/mutations";
import {
  getBadgeBackpackById,
  getBadgeBackpacks,
} from "../api/badgeBackpacks/queries";
import {
  badgeBackpackIdSchema,
  insertBadgeBackpackParams,
  updateBadgeBackpackParams,
} from "../db/schema/badgeBackpacks";
import { publicProcedure, router } from "../server/trpc";

export const badgeBackpacksRouter = router({
  getBadgeBackpacks: publicProcedure.query(async () => {
    return getBadgeBackpacks();
  }),
  getBadgeBackpackById: publicProcedure
    .input(badgeBackpackIdSchema)
    .query(async ({ input }) => {
      return getBadgeBackpackById(input.id);
    }),
  createBadgeBackpack: publicProcedure
    .input(insertBadgeBackpackParams)
    .mutation(async ({ input }) => {
      return createBadgeBackpack(input);
    }),
  updateBadgeBackpack: publicProcedure
    .input(updateBadgeBackpackParams)
    .mutation(async ({ input }) => {
      return updateBadgeBackpack(input.id, input);
    }),
  deleteBadgeBackpack: publicProcedure
    .input(badgeBackpackIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeBackpack(input.id);
    }),
});
