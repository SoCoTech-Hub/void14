import {
  badgeExternalBackpackIdSchema,
  insertBadgeExternalBackpackParams,
  updateBadgeExternalBackpackParams,
} from "@soco/badge-db/schema/badgeExternalBackpacks";

import {
  createBadgeExternalBackpack,
  deleteBadgeExternalBackpack,
  updateBadgeExternalBackpack,
} from "../api/badgeExternalBackpacks/mutations";
import {
  getBadgeExternalBackpackById,
  getBadgeExternalBackpacks,
} from "../api/badgeExternalBackpacks/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const badgeExternalBackpacksRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
