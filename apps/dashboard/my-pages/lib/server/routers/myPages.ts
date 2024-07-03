import { getMyPageById, getMyPages } from "@/lib/api/myPages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  myPageIdSchema,
  insertMyPageParams,
  updateMyPageParams,
} from "@/lib/db/schema/myPages";
import { createMyPage, deleteMyPage, updateMyPage } from "@/lib/api/myPages/mutations";

export const myPagesRouter = router({
  getMyPages: publicProcedure.query(async () => {
    return getMyPages();
  }),
  getMyPageById: publicProcedure.input(myPageIdSchema).query(async ({ input }) => {
    return getMyPageById(input.id);
  }),
  createMyPage: publicProcedure
    .input(insertMyPageParams)
    .mutation(async ({ input }) => {
      return createMyPage(input);
    }),
  updateMyPage: publicProcedure
    .input(updateMyPageParams)
    .mutation(async ({ input }) => {
      return updateMyPage(input.id, input);
    }),
  deleteMyPage: publicProcedure
    .input(myPageIdSchema)
    .mutation(async ({ input }) => {
      return deleteMyPage(input.id);
    }),
});
