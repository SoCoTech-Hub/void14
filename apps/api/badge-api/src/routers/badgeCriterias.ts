import { getBadgeCriteriaById, getBadgeCriterias } from "../api/badgeCriterias/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  badgeCriteriaIdSchema,
  insertBadgeCriteriaParams,
  updateBadgeCriteriaParams,
} from "@soco/badge-db/schema/badgeCriterias";
import { createBadgeCriteria, deleteBadgeCriteria, updateBadgeCriteria } from "../api/badgeCriterias/mutations";

export const badgeCriteriasRouter =createTRPCRouter({
  getBadgeCriterias: publicProcedure.query(async () => {
    return getBadgeCriterias();
  }),
  getBadgeCriteriaById: publicProcedure.input(badgeCriteriaIdSchema).query(async ({ input }) => {
    return getBadgeCriteriaById(input.id);
  }),
  createBadgeCriteria: publicProcedure
    .input(insertBadgeCriteriaParams)
    .mutation(async ({ input }) => {
      return createBadgeCriteria(input);
    }),
  updateBadgeCriteria: publicProcedure
    .input(updateBadgeCriteriaParams)
    .mutation(async ({ input }) => {
      return updateBadgeCriteria(input.id, input);
    }),
  deleteBadgeCriteria: publicProcedure
    .input(badgeCriteriaIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeCriteria(input.id);
    }),
});
