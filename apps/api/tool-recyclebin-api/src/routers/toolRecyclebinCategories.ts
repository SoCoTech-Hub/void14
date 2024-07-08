import { getToolRecyclebinCategoryById, getToolRecyclebinCategories } from "../api/toolRecyclebinCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  toolRecyclebinCategoryIdSchema,
  insertToolRecyclebinCategoryParams,
  updateToolRecyclebinCategoryParams,
} from "@soco/tool-recyclebin-db/schema/toolRecyclebinCategories";
import { createToolRecyclebinCategory, deleteToolRecyclebinCategory, updateToolRecyclebinCategory } from "../api/toolRecyclebinCategories/mutations";

export const toolRecyclebinCategoriesRouter =createTRPCRouter({
  getToolRecyclebinCategories: publicProcedure.query(async () => {
    return getToolRecyclebinCategories();
  }),
  getToolRecyclebinCategoryById: publicProcedure.input(toolRecyclebinCategoryIdSchema).query(async ({ input }) => {
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
