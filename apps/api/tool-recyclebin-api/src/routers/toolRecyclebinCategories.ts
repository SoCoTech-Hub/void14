import {
  insertToolRecyclebinCategoryParams,
  toolRecyclebinCategoryIdSchema,
  updateToolRecyclebinCategoryParams,
} from "@soco/tool-recyclebin-db/schema/toolRecyclebinCategories";

import {
  createToolRecyclebinCategory,
  deleteToolRecyclebinCategory,
  updateToolRecyclebinCategory,
} from "../api/toolRecyclebinCategories/mutations";
import {
  getToolRecyclebinCategories,
  getToolRecyclebinCategoryById,
} from "../api/toolRecyclebinCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolRecyclebinCategoriesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getToolRecyclebinCategories: publicProcedure.query(async () => {
    return getToolRecyclebinCategories();
  }),
  getToolRecyclebinCategoryById: publicProcedure
    .input(toolRecyclebinCategoryIdSchema)
    .query(async ({ input }) => {
      return getToolRecyclebinCategoryById(input.id);
    }),
  createToolRecyclebinCategory: publicProcedure
    .input(insertToolRecyclebinCategoryParams)
    .mutation(async ({ input }) => {
      return createToolRecyclebinCategory(input);
    }),
  updateToolRecyclebinCategory: publicProcedure
    .input(updateToolRecyclebinCategoryParams)
    .mutation(async ({ input }) => {
      return updateToolRecyclebinCategory(input.id, input);
    }),
  deleteToolRecyclebinCategory: publicProcedure
    .input(toolRecyclebinCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolRecyclebinCategory(input.id);
    }),
});
