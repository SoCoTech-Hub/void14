import {
  createUserInfoData,
  deleteUserInfoData,
  updateUserInfoData,
} from "../api/userInfoDatas/mutations";
import {
  getUserInfoDataById,
  getUserInfoDatas,
} from "../api/userInfoDatas/queries";
import {
  insertUserInfoDataParams,
  updateUserInfoDataParams,
  userInfoDataIdSchema,
} from "../db/schema/userInfoDatas";
import { publicProcedure, router } from "../server/trpc";

export const userInfoDatasRouter = router({
  getUserInfoDatas: publicProcedure.query(async () => {
    return getUserInfoDatas();
  }),
  getUserInfoDataById: publicProcedure
    .input(userInfoDataIdSchema)
    .query(async ({ input }) => {
      return getUserInfoDataById(input.id);
    }),
  createUserInfoData: publicProcedure
    .input(insertUserInfoDataParams)
    .mutation(async ({ input }) => {
      return createUserInfoData(input);
    }),
  updateUserInfoData: publicProcedure
    .input(updateUserInfoDataParams)
    .mutation(async ({ input }) => {
      return updateUserInfoData(input.id, input);
    }),
  deleteUserInfoData: publicProcedure
    .input(userInfoDataIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserInfoData(input.id);
    }),
});
