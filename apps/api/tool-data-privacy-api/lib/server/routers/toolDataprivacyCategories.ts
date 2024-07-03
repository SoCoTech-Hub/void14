import { getToolDataprivacyCategoryById, getToolDataprivacyCategories } from "@/lib/api/toolDataprivacyCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolDataprivacyCategoryIdSchema,
  insertToolDataprivacyCategoryParams,
  updateToolDataprivacyCategoryParams,
} from "@/lib/db/schema/toolDataprivacyCategories";
import { createToolDataprivacyCategory, deleteToolDataprivacyCategory, updateToolDataprivacyCategory } from "@/lib/api/toolDataprivacyCategories/mutations";

export const toolDataprivacyCategoriesRouter = router({
  getToolDataprivacyCategories: publicProcedure.query(async () => {
    return getToolDataprivacyCategories();
  }),
  getToolDataprivacyCategoryById: publicProcedure.input(toolDataprivacyCategoryIdSchema).query(async ({ input }) => {
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
