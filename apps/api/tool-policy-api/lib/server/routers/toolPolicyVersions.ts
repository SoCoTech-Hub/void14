import {
  createToolPolicyVersion,
  deleteToolPolicyVersion,
  updateToolPolicyVersion,
} from "../api/toolPolicyVersions/mutations";
import {
  getToolPolicyVersionById,
  getToolPolicyVersions,
} from "../api/toolPolicyVersions/queries";
import {
  insertToolPolicyVersionParams,
  toolPolicyVersionIdSchema,
  updateToolPolicyVersionParams,
} from "../db/schema/toolPolicyVersions";
import { publicProcedure, router } from "../server/trpc";

export const toolPolicyVersionsRouter = router({
  getToolPolicyVersions: publicProcedure.query(async () => {
    return getToolPolicyVersions();
  }),
  getToolPolicyVersionById: publicProcedure
    .input(toolPolicyVersionIdSchema)
    .query(async ({ input }) => {
      return getToolPolicyVersionById(input.id);
    }),
  createToolPolicyVersion: publicProcedure
    .input(insertToolPolicyVersionParams)
    .mutation(async ({ input }) => {
      return createToolPolicyVersion(input);
    }),
  updateToolPolicyVersion: publicProcedure
    .input(updateToolPolicyVersionParams)
    .mutation(async ({ input }) => {
      return updateToolPolicyVersion(input.id, input);
    }),
  deleteToolPolicyVersion: publicProcedure
    .input(toolPolicyVersionIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolPolicyVersion(input.id);
    }),
});
