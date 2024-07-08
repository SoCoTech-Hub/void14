import { getToolPolicyAcceptanceById, getToolPolicyAcceptances } from "../api/toolPolicyAcceptances/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  toolPolicyAcceptanceIdSchema,
  insertToolPolicyAcceptanceParams,
  updateToolPolicyAcceptanceParams,
} from "@soco/tool-policy-db/schema/toolPolicyAcceptances";
import { createToolPolicyAcceptance, deleteToolPolicyAcceptance, updateToolPolicyAcceptance } from "../api/toolPolicyAcceptances/mutations";

export const toolPolicyAcceptancesRouter =createTRPCRouter({
  getToolPolicyAcceptances: publicProcedure.query(async () => {
    return getToolPolicyAcceptances();
  }),
  getToolPolicyAcceptanceById: publicProcedure.input(toolPolicyAcceptanceIdSchema).query(async ({ input }) => {
    return getToolPolicyAcceptanceById(input.id);
  }),
  createToolPolicyAcceptance: publicProcedure
    .input(insertToolPolicyAcceptanceParams)
    .mutation(async ({ input }) => {
      return createToolPolicyAcceptance(input);
    }),
  updateToolPolicyAcceptance: publicProcedure
    .input(updateToolPolicyAcceptanceParams)
    .mutation(async ({ input }) => {
      return updateToolPolicyAcceptance(input.id, input);
    }),
  deleteToolPolicyAcceptance: publicProcedure
    .input(toolPolicyAcceptanceIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolPolicyAcceptance(input.id);
    }),
});
