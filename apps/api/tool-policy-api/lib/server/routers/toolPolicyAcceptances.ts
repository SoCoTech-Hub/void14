import { getToolPolicyAcceptanceById, getToolPolicyAcceptances } from "@/lib/api/toolPolicyAcceptances/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolPolicyAcceptanceIdSchema,
  insertToolPolicyAcceptanceParams,
  updateToolPolicyAcceptanceParams,
} from "@/lib/db/schema/toolPolicyAcceptances";
import { createToolPolicyAcceptance, deleteToolPolicyAcceptance, updateToolPolicyAcceptance } from "@/lib/api/toolPolicyAcceptances/mutations";

export const toolPolicyAcceptancesRouter = router({
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
