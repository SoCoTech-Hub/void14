import { getUserInfoDataById, getUserInfoDatas } from "../api/userInfoDatas/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  userInfoDataIdSchema,
  insertUserInfoDataParams,
  updateUserInfoDataParams,
} from "@soco/user-db/schema/userInfoDatas";
import { createUserInfoData, deleteUserInfoData, updateUserInfoData } from "../api/userInfoDatas/mutations";

export const userInfoDatasRouter =createTRPCRouter({
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
