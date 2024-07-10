import { getCustomFieldCategoryById, getCustomFieldCategories } from "../api/customFieldCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  customFieldCategoryIdSchema,
  insertCustomFieldCategoryParams,
  updateCustomFieldCategoryParams,
} from "@soco/custom-field-db/schema/customFieldCategories";
import { createCustomFieldCategory, deleteCustomFieldCategory, updateCustomFieldCategory } from "../api/customFieldCategories/mutations";

export const customFieldCategoriesRouter =createTRPCRouter({
  getCustomFieldCategories: publicProcedure.query(async () => {
    return getCustomFieldCategories();
  }),
  getCustomFieldCategoryById: publicProcedure.input(customFieldCategoryIdSchema).query(async ({ input }) => {
    return getCustomFieldCategoryById(input.id);
  }),
  createCustomFieldCategory: publicProcedure
    .input(insertCustomFieldCategoryParams)
    .mutation(async ({ input }) => {
      return createCustomFieldCategory(input);
    }),
  updateCustomFieldCategory: publicProcedure
    .input(updateCustomFieldCategoryParams)
    .mutation(async ({ input }) => {
      return updateCustomFieldCategory(input.id, input);
    }),
  deleteCustomFieldCategory: publicProcedure
    .input(customFieldCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteCustomFieldCategory(input.id);
    }),
});
