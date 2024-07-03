import { getUserInfoFieldById, getUserInfoFields } from "@/lib/api/userInfoFields/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userInfoFieldIdSchema,
  insertUserInfoFieldParams,
  updateUserInfoFieldParams,
} from "@/lib/db/schema/userInfoFields";
import { createUserInfoField, deleteUserInfoField, updateUserInfoField } from "@/lib/api/userInfoFields/mutations";

export const userInfoFieldsRouter = router({
  getUserInfoFields: publicProcedure.query(async () => {
    return getUserInfoFields();
  }),
  getUserInfoFieldById: publicProcedure.input(userInfoFieldIdSchema).query(async ({ input }) => {
    return getUserInfoFieldById(input.id);
  }),
  createUserInfoField: publicProcedure
    .input(insertUserInfoFieldParams)
    .mutation(async ({ input }) => {
      return createUserInfoField(input);
    }),
  updateUserInfoField: publicProcedure
    .input(updateUserInfoFieldParams)
    .mutation(async ({ input }) => {
      return updateUserInfoField(input.id, input);
    }),
  deleteUserInfoField: publicProcedure
    .input(userInfoFieldIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserInfoField(input.id);
    }),
});
