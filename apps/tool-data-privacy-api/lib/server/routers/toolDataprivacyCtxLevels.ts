import { getToolDataprivacyCtxLevelById, getToolDataprivacyCtxLevels } from "@/lib/api/toolDataprivacyCtxLevels/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolDataprivacyCtxLevelIdSchema,
  insertToolDataprivacyCtxLevelParams,
  updateToolDataprivacyCtxLevelParams,
} from "@/lib/db/schema/toolDataprivacyCtxLevels";
import { createToolDataprivacyCtxLevel, deleteToolDataprivacyCtxLevel, updateToolDataprivacyCtxLevel } from "@/lib/api/toolDataprivacyCtxLevels/mutations";

export const toolDataprivacyCtxLevelsRouter = router({
  getToolDataprivacyCtxLevels: publicProcedure.query(async () => {
    return getToolDataprivacyCtxLevels();
  }),
  getToolDataprivacyCtxLevelById: publicProcedure.input(toolDataprivacyCtxLevelIdSchema).query(async ({ input }) => {
    return getToolDataprivacyCtxLevelById(input.id);
  }),
  createToolDataprivacyCtxLevel: publicProcedure
    .input(insertToolDataprivacyCtxLevelParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyCtxLevel(input);
    }),
  updateToolDataprivacyCtxLevel: publicProcedure
    .input(updateToolDataprivacyCtxLevelParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyCtxLevel(input.id, input);
    }),
  deleteToolDataprivacyCtxLevel: publicProcedure
    .input(toolDataprivacyCtxLevelIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyCtxLevel(input.id);
    }),
});
