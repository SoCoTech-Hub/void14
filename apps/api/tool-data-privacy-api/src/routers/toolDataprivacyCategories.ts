import {
  insertToolDataprivacyCategoryParams,
  toolDataprivacyCategoryIdSchema,
  updateToolDataprivacyCategoryParams,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCategories";

import {
  createToolDataprivacyCategory,
  deleteToolDataprivacyCategory,
  updateToolDataprivacyCategory,
} from "../api/toolDataprivacyCategories/mutations";
import {
  getToolDataprivacyCategories,
  getToolDataprivacyCategoryById,
} from "../api/toolDataprivacyCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolDataprivacyCategoriesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getToolDataprivacyCategories: publicProcedure.query(async () => {
    return getToolDataprivacyCategories();
  }),
  getToolDataprivacyCategoryById: publicProcedure
    .input(toolDataprivacyCategoryIdSchema)
    .query(async ({ input }) => {
      return getToolDataprivacyCategoryById(input.id);
    }),
  createToolDataprivacyCategory: publicProcedure
    .input(insertToolDataprivacyCategoryParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyCategory(input);
    }),
  updateToolDataprivacyCategory: publicProcedure
    .input(updateToolDataprivacyCategoryParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyCategory(input.id, input);
    }),
  deleteToolDataprivacyCategory: publicProcedure
    .input(toolDataprivacyCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyCategory(input.id);
    }),
});
