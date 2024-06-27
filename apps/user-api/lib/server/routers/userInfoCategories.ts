import { getUserInfoCategoryById, getUserInfoCategories } from "@/lib/api/userInfoCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userInfoCategoryIdSchema,
  insertUserInfoCategoryParams,
  updateUserInfoCategoryParams,
} from "@/lib/db/schema/userInfoCategories";
import { createUserInfoCategory, deleteUserInfoCategory, updateUserInfoCategory } from "@/lib/api/userInfoCategories/mutations";

export const userInfoCategoriesRouter = router({
  getUserInfoCategories: publicProcedure.query(async () => {
    return getUserInfoCategories();
  }),
  getUserInfoCategoryById: publicProcedure.input(userInfoCategoryIdSchema).query(async ({ input }) => {
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
