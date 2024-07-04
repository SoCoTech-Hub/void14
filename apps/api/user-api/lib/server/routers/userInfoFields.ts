import {
  createUserInfoField,
  deleteUserInfoField,
  updateUserInfoField,
} from "../api/userInfoFields/mutations";
import {
  getUserInfoFieldById,
  getUserInfoFields,
} from "../api/userInfoFields/queries";
import {
  insertUserInfoFieldParams,
  updateUserInfoFieldParams,
  userInfoFieldIdSchema,
} from "../db/schema/userInfoFields";
import { publicProcedure, router } from "../server/trpc";

export const userInfoFieldsRouter = router({
  getUserInfoFields: publicProcedure.query(async () => {
    return getUserInfoFields();
  }),
  getUserInfoFieldById: publicProcedure
    .input(userInfoFieldIdSchema)
    .query(async ({ input }) => {
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
