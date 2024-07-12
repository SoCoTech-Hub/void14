import {
  insertScormSeqRuleCondParams,
  scormSeqRuleCondIdSchema,
  updateScormSeqRuleCondParams,
} from "@soco/scorm-db/schema/scormSeqRuleConds";

import {
  createScormSeqRuleCond,
  deleteScormSeqRuleCond,
  updateScormSeqRuleCond,
} from "../api/scormSeqRuleConds/mutations";
import {
  getScormSeqRuleCondById,
  getScormSeqRuleConds,
} from "../api/scormSeqRuleConds/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scormSeqRuleCondsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getScormSeqRuleConds: publicProcedure.query(async () => {
      return getScormSeqRuleConds();
    }),
    getScormSeqRuleCondById: publicProcedure
      .input(scormSeqRuleCondIdSchema)
      .query(async ({ input }) => {
        return getScormSeqRuleCondById(input.id);
      }),
    createScormSeqRuleCond: publicProcedure
      .input(insertScormSeqRuleCondParams)
      .mutation(async ({ input }) => {
        return createScormSeqRuleCond(input);
      }),
    updateScormSeqRuleCond: publicProcedure
      .input(updateScormSeqRuleCondParams)
      .mutation(async ({ input }) => {
        return updateScormSeqRuleCond(input.id, input);
      }),
    deleteScormSeqRuleCond: publicProcedure
      .input(scormSeqRuleCondIdSchema)
      .mutation(async ({ input }) => {
        return deleteScormSeqRuleCond(input.id);
      }),
  });
