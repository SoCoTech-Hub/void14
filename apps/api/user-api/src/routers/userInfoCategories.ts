import {
  insertUserInfoCategoryParams,
  updateUserInfoCategoryParams,
  userInfoCategoryIdSchema,
} from "@soco/user-db/schema/userInfoCategories";

import {
  createUserInfoCategory,
  deleteUserInfoCategory,
  updateUserInfoCategory,
} from "../api/userInfoCategories/mutations";
import {
  getUserInfoCategories,
  getUserInfoCategoryById,
} from "../api/userInfoCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userInfoCategoriesRouter = createTRPCRouter({
  getUserInfoCategories: publicProcedure.query(async () => {
    return getUserInfoCategories();
  }),
  getUserInfoCategoryById: publicProcedure
    .input(userInfoCategoryIdSchema)
    .query(async ({ input }) => {
      return getUserInfoCategoryById(input.id);
    }),
  createUserInfoCategory: publicProcedure
    .input(insertUserInfoCategoryParams)
    .mutation(async ({ input }) => {
      return createUserInfoCategory(input);
    }),
  updateUserInfoCategory: publicProcedure
    .input(updateUserInfoCategoryParams)
    .mutation(async ({ input }) => {
      return updateUserInfoCategory(input.id, input);
    }),
  deleteUserInfoCategory: publicProcedure
    .input(userInfoCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserInfoCategory(input.id);
    }),
});
