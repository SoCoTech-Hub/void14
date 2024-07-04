import {
  createToolMonitorRule,
  deleteToolMonitorRule,
  updateToolMonitorRule,
} from "../api/toolMonitorRules/mutations";
import {
  getToolMonitorRuleById,
  getToolMonitorRules,
} from "../api/toolMonitorRules/queries";
import {
  insertToolMonitorRuleParams,
  toolMonitorRuleIdSchema,
  updateToolMonitorRuleParams,
} from "../db/schema/toolMonitorRules";
import { publicProcedure, router } from "../server/trpc";

export const toolMonitorRulesRouter = router({
  getToolMonitorRules: publicProcedure.query(async () => {
    return getToolMonitorRules();
  }),
  getToolMonitorRuleById: publicProcedure
    .input(toolMonitorRuleIdSchema)
    .query(async ({ input }) => {
      return getToolMonitorRuleById(input.id);
    }),
  createToolMonitorRule: publicProcedure
    .input(insertToolMonitorRuleParams)
    .mutation(async ({ input }) => {
      return createToolMonitorRule(input);
    }),
  updateToolMonitorRule: publicProcedure
    .input(updateToolMonitorRuleParams)
    .mutation(async ({ input }) => {
      return updateToolMonitorRule(input.id, input);
    }),
  deleteToolMonitorRule: publicProcedure
    .input(toolMonitorRuleIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolMonitorRule(input.id);
    }),
});
