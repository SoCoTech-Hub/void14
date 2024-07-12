import {
  insertUserParams,
  updateUserParams,
  userIdSchema,
} from "@soco/user-db/schema/users";

import { createUser, deleteUser, updateUser } from "../api/users/mutations";
import { getUserById, getUsers } from "../api/users/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getUsers: publicProcedure.query(async () => {
      return getUsers();
    }),
    getUserById: publicProcedure
      .input(userIdSchema)
      .query(async ({ input }) => {
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
