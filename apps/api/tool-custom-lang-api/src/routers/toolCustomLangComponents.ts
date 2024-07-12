import {
  insertToolCustomLangComponentParams,
  toolCustomLangComponentIdSchema,
  updateToolCustomLangComponentParams,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangComponents";

import {
  createToolCustomLangComponent,
  deleteToolCustomLangComponent,
  updateToolCustomLangComponent,
} from "../api/toolCustomLangComponents/mutations";
import {
  getToolCustomLangComponentById,
  getToolCustomLangComponents,
} from "../api/toolCustomLangComponents/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolCustomLangComponentsRouter = createTRPCRouter({
  getToolCustomLangComponents: publicProcedure.query(async () => {
    return getToolCustomLangComponents();
  }),
  getToolCustomLangComponentById: publicProcedure
    .input(toolCustomLangComponentIdSchema)
    .query(async ({ input }) => {
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
