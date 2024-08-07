import {
  insertScormSeqRuleConditionParams,
  scormSeqRuleConditionIdSchema,
  updateScormSeqRuleConditionParams,
} from "@soco/scorm-db/schema/scormSeqRuleConditions";

import {
  createScormSeqRuleCondition,
  deleteScormSeqRuleCondition,
  updateScormSeqRuleCondition,
} from "../api/scormSeqRuleConditions/mutations";
import {
  getScormSeqRuleConditionById,
  getScormSeqRuleConditions,
} from "../api/scormSeqRuleConditions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scormSeqRuleConditionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getScormSeqRuleConditions: publicProcedure.query(async () => {
      return getScormSeqRuleConditions();
    }),
    getScormSeqRuleConditionById: publicProcedure
      .input(scormSeqRuleConditionIdSchema)
      .query(async ({ input }) => {
        return getScormSeqRuleConditionById(input.id);
      }),
    createScormSeqRuleCondition: publicProcedure
      .input(insertScormSeqRuleConditionParams)
      .mutation(async ({ input }) => {
        return createScormSeqRuleCondition(input);
      }),
    updateScormSeqRuleCondition: publicProcedure
      .input(updateScormSeqRuleConditionParams)
      .mutation(async ({ input }) => {
        return updateScormSeqRuleCondition(input.id, input);
      }),
    deleteScormSeqRuleCondition: publicProcedure
      .input(scormSeqRuleConditionIdSchema)
      .mutation(async ({ input }) => {
        return deleteScormSeqRuleCondition(input.id);
      }),
  });
