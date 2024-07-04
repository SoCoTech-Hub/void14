import {
  createMyPage,
  deleteMyPage,
  updateMyPage,
} from "../api/myPages/mutations";
import { getMyPageById, getMyPages } from "../api/myPages/queries";
import {
  insertMyPageParams,
  myPageIdSchema,
  updateMyPageParams,
} from "../db/schema/myPages";
import { publicProcedure, router } from "../server/trpc";

export const myPagesRouter = router({
  getMyPages: publicProcedure.query(async () => {
    return getMyPages();
  }),
  getMyPageById: publicProcedure
    .input(myPageIdSchema)
    .query(async ({ input }) => {
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
