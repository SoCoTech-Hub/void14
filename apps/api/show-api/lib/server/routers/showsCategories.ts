import { getShowsCategoryById, getShowsCategories } from "@/lib/api/showsCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  showsCategoryIdSchema,
  insertShowsCategoryParams,
  updateShowsCategoryParams,
} from "@/lib/db/schema/showsCategories";
import { createShowsCategory, deleteShowsCategory, updateShowsCategory } from "@/lib/api/showsCategories/mutations";

export const showsCategoriesRouter = router({
  getShowsCategories: publicProcedure.query(async () => {
    return getShowsCategories();
  }),
  getShowsCategoryById: publicProcedure.input(showsCategoryIdSchema).query(async ({ input }) => {
    return getShowsCategoryById(input.id);
  }),
  createShowsCategory: publicProcedure
    .input(insertShowsCategoryParams)
    .mutation(async ({ input }) => {
      return createShowsCategory(input);
    }),
  updateShowsCategory: publicProcedure
    .input(updateShowsCategoryParams)
    .mutation(async ({ input }) => {
      return updateShowsCategory(input.id, input);
    }),
  deleteShowsCategory: publicProcedure
    .input(showsCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteShowsCategory(input.id);
    }),
});
