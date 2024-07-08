import { getScormSeqRuleConditionById, getScormSeqRuleConditions } from "../api/scormSeqRuleConditions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  scormSeqRuleConditionIdSchema,
  insertScormSeqRuleConditionParams,
  updateScormSeqRuleConditionParams,
} from "@soco/scorm-db/schema/scormSeqRuleConditions";
import { createScormSeqRuleCondition, deleteScormSeqRuleCondition, updateScormSeqRuleCondition } from "../api/scormSeqRuleConditions/mutations";

export const scormSeqRuleConditionsRouter =createTRPCRouter({
  getScormSeqRuleConditions: publicProcedure.query(async () => {
    return getScormSeqRuleConditions();
  }),
  getScormSeqRuleConditionById: publicProcedure.input(scormSeqRuleConditionIdSchema).query(async ({ input }) => {
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
