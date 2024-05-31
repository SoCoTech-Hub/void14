import { getUserInfoDataById, getUserInfoDatas } from "@/lib/api/userInfoDatas/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userInfoDataIdSchema,
  insertUserInfoDataParams,
  updateUserInfoDataParams,
} from "@/lib/db/schema/userInfoDatas";
import { createUserInfoData, deleteUserInfoData, updateUserInfoData } from "@/lib/api/userInfoDatas/mutations";

export const userInfoDatasRouter = router({
  getUserInfoDatas: publicProcedure.query(async () => {
    return getUserInfoDatas();
  }),
  getUserInfoDataById: publicProcedure.input(userInfoDataIdSchema).query(async ({ input }) => {
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
