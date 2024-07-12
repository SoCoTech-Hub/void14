import {
  insertToolMonitorRuleParams,
  toolMonitorRuleIdSchema,
  updateToolMonitorRuleParams,
} from "@soco/tool-monitor-db/schema/toolMonitorRules";

import {
  createToolMonitorRule,
  deleteToolMonitorRule,
  updateToolMonitorRule,
} from "../api/toolMonitorRules/mutations";
import {
  getToolMonitorRuleById,
  getToolMonitorRules,
} from "../api/toolMonitorRules/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolMonitorRulesRouter = createTRPCRouter({
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
