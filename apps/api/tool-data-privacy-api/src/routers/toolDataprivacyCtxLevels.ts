import { getToolDataprivacyCtxLevelById, getToolDataprivacyCtxLevels } from "../api/toolDataprivacyCtxLevels/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  toolDataprivacyCtxLevelIdSchema,
  insertToolDataprivacyCtxLevelParams,
  updateToolDataprivacyCtxLevelParams,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxLevels";
import { createToolDataprivacyCtxLevel, deleteToolDataprivacyCtxLevel, updateToolDataprivacyCtxLevel } from "../api/toolDataprivacyCtxLevels/mutations";

export const toolDataprivacyCtxLevelsRouter =createTRPCRouter({
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
