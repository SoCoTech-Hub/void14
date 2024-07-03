import { getToolCustomLangComponentById, getToolCustomLangComponents } from "@/lib/api/toolCustomLangComponents/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolCustomLangComponentIdSchema,
  insertToolCustomLangComponentParams,
  updateToolCustomLangComponentParams,
} from "@/lib/db/schema/toolCustomLangComponents";
import { createToolCustomLangComponent, deleteToolCustomLangComponent, updateToolCustomLangComponent } from "@/lib/api/toolCustomLangComponents/mutations";

export const toolCustomLangComponentsRouter = router({
  getToolCustomLangComponents: publicProcedure.query(async () => {
    return getToolCustomLangComponents();
  }),
  getToolCustomLangComponentById: publicProcedure.input(toolCustomLangComponentIdSchema).query(async ({ input }) => {
    return getToolCustomLangComponentById(input.id);
  }),
  createToolCustomLangComponent: publicProcedure
    .input(insertToolCustomLangComponentParams)
    .mutation(async ({ input }) => {
      return createToolCustomLangComponent(input);
    }),
  updateToolCustomLangComponent: publicProcedure
    .input(updateToolCustomLangComponentParams)
    .mutation(async ({ input }) => {
      return updateToolCustomLangComponent(input.id, input);
    }),
  deleteToolCustomLangComponent: publicProcedure
    .input(toolCustomLangComponentIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolCustomLangComponent(input.id);
    }),
});
