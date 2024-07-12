import {
  customFieldCategoryIdSchema,
  insertCustomFieldCategoryParams,
  updateCustomFieldCategoryParams,
} from "@soco/custom-field-db/schema/customFieldCategories";

import {
  createCustomFieldCategory,
  deleteCustomFieldCategory,
  updateCustomFieldCategory,
} from "../api/customFieldCategories/mutations";
import {
  getCustomFieldCategories,
  getCustomFieldCategoryById,
} from "../api/customFieldCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const customFieldCategoriesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getCustomFieldCategories: publicProcedure.query(async () => {
      return getCustomFieldCategories();
    }),
    getCustomFieldCategoryById: publicProcedure
      .input(customFieldCategoryIdSchema)
      .query(async ({ input }) => {
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
