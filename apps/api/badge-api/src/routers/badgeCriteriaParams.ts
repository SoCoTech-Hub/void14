import { getBadgeCriteriaParamById, getBadgeCriteriaParams } from "../api/badgeCriteriaParams/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  badgeCriteriaParamIdSchema,
  insertBadgeCriteriaParamParams,
  updateBadgeCriteriaParamParams,
} from "@soco/badge-db/schema/badgeCriteriaParams";
import { createBadgeCriteriaParam, deleteBadgeCriteriaParam, updateBadgeCriteriaParam } from "../api/badgeCriteriaParams/mutations";

export const badgeCriteriaParamsRouter =createTRPCRouter({
  getBadgeCriteriaParams: publicProcedure.query(async () => {
    return getBadgeCriteriaParams();
  }),
  getBadgeCriteriaParamById: publicProcedure.input(badgeCriteriaParamIdSchema).query(async ({ input }) => {
    return getBadgeCriteriaParamById(input.id);
  }),
  createBadgeCriteriaParam: publicProcedure
    .input(insertBadgeCriteriaParamParams)
    .mutation(async ({ input }) => {
      return createBadgeCriteriaParam(input);
    }),
  updateBadgeCriteriaParam: publicProcedure
    .input(updateBadgeCriteriaParamParams)
    .mutation(async ({ input }) => {
      return updateBadgeCriteriaParam(input.id, input);
    }),
  deleteBadgeCriteriaParam: publicProcedure
    .input(badgeCriteriaParamIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeCriteriaParam(input.id);
    }),
});
