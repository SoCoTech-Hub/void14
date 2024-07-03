import { getToolDataprivacyPurposeById, getToolDataprivacyPurposes } from "@/lib/api/toolDataprivacyPurposes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolDataprivacyPurposeIdSchema,
  insertToolDataprivacyPurposeParams,
  updateToolDataprivacyPurposeParams,
} from "@/lib/db/schema/toolDataprivacyPurposes";
import { createToolDataprivacyPurpose, deleteToolDataprivacyPurpose, updateToolDataprivacyPurpose } from "@/lib/api/toolDataprivacyPurposes/mutations";

export const toolDataprivacyPurposesRouter = router({
  getToolDataprivacyPurposes: publicProcedure.query(async () => {
    return getToolDataprivacyPurposes();
  }),
  getToolDataprivacyPurposeById: publicProcedure.input(toolDataprivacyPurposeIdSchema).query(async ({ input }) => {
    return getToolDataprivacyPurposeById(input.id);
  }),
  createToolDataprivacyPurpose: publicProcedure
    .input(insertToolDataprivacyPurposeParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyPurpose(input);
    }),
  updateToolDataprivacyPurpose: publicProcedure
    .input(updateToolDataprivacyPurposeParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyPurpose(input.id, input);
    }),
  deleteToolDataprivacyPurpose: publicProcedure
    .input(toolDataprivacyPurposeIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyPurpose(input.id);
    }),
});
