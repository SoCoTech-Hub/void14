import {
  badgeRelatedIdSchema,
  insertBadgeRelatedParams,
  updateBadgeRelatedParams,
} from "@soco/badge-db/schema/badgeRelateds";

import {
  createBadgeRelated,
  deleteBadgeRelated,
  updateBadgeRelated,
} from "../api/badgeRelateds/mutations";
import {
  getBadgeRelatedById,
  getBadgeRelateds,
} from "../api/badgeRelateds/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const badgeRelatedsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getBadgeRelateds: publicProcedure.query(async () => {
      return getBadgeRelateds();
    }),
    getBadgeRelatedById: publicProcedure
      .input(badgeRelatedIdSchema)
      .query(async ({ input }) => {
        return getBadgeRelatedById(input.id);
      }),
    createBadgeRelated: publicProcedure
      .input(insertBadgeRelatedParams)
      .mutation(async ({ input }) => {
        return createBadgeRelated(input);
      }),
    updateBadgeRelated: publicProcedure
      .input(updateBadgeRelatedParams)
      .mutation(async ({ input }) => {
        return updateBadgeRelated(input.id, input);
      }),
    deleteBadgeRelated: publicProcedure
      .input(badgeRelatedIdSchema)
      .mutation(async ({ input }) => {
        return deleteBadgeRelated(input.id);
      }),
  });
