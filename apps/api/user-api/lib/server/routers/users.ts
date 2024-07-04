import { createUser, deleteUser, updateUser } from "../api/users/mutations";
import { getUserById, getUsers } from "../api/users/queries";
import {
  insertUserParams,
  updateUserParams,
  userIdSchema,
} from "../db/schema/users";
import { publicProcedure, router } from "../server/trpc";

export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
  getUserById: publicProcedure.input(userIdSchema).query(async ({ input }) => {
    return getUserById(input.id);
  }),
  createUser: publicProcedure
    .input(insertUserParams)
    .mutation(async ({ input }) => {
      return createUser(input);
    }),
  updateUser: publicProcedure
    .input(updateUserParams)
    .mutation(async ({ input }) => {
      return updateUser(input.id, input);
    }),
  deleteUser: publicProcedure
    .input(userIdSchema)
    .mutation(async ({ input }) => {
      return deleteUser(input.id);
    }),
});
