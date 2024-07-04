import {
  createToolPolicyAcceptance,
  deleteToolPolicyAcceptance,
  updateToolPolicyAcceptance,
} from "../api/toolPolicyAcceptances/mutations";
import {
  getToolPolicyAcceptanceById,
  getToolPolicyAcceptances,
} from "../api/toolPolicyAcceptances/queries";
import {
  insertToolPolicyAcceptanceParams,
  toolPolicyAcceptanceIdSchema,
  updateToolPolicyAcceptanceParams,
} from "../db/schema/toolPolicyAcceptances";
import { publicProcedure, router } from "../server/trpc";

export const toolPolicyAcceptancesRouter = router({
  getToolPolicyAcceptances: publicProcedure.query(async () => {
    return getToolPolicyAcceptances();
  }),
  getToolPolicyAcceptanceById: publicProcedure
    .input(toolPolicyAcceptanceIdSchema)
    .query(async ({ input }) => {
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
