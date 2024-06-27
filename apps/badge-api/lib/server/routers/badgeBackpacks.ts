import { getBadgeBackpackById, getBadgeBackpacks } from "@/lib/api/badgeBackpacks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeBackpackIdSchema,
  insertBadgeBackpackParams,
  updateBadgeBackpackParams,
} from "@/lib/db/schema/badgeBackpacks";
import { createBadgeBackpack, deleteBadgeBackpack, updateBadgeBackpack } from "@/lib/api/badgeBackpacks/mutations";

export const badgeBackpacksRouter = router({
  getBadgeBackpacks: publicProcedure.query(async () => {
    return getBadgeBackpacks();
  }),
  getBadgeBackpackById: publicProcedure.input(badgeBackpackIdSchema).query(async ({ input }) => {
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
