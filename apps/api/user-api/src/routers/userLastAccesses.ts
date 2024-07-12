import {
  insertUserLastAccessParams,
  updateUserLastAccessParams,
  userLastAccessIdSchema,
} from "@soco/user-db/schema/userLastAccesses";

import {
  createUserLastAccess,
  deleteUserLastAccess,
  updateUserLastAccess,
} from "../api/userLastAccesses/mutations";
import {
  getUserLastAccessById,
  getUserLastAccesses,
} from "../api/userLastAccesses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userLastAccessesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getUserLastAccesses: publicProcedure.query(async () => {
      return getUserLastAccesses();
    }),
    getUserLastAccessById: publicProcedure
      .input(userLastAccessIdSchema)
      .query(async ({ input }) => {
        return getUserLastAccessById(input.id);
      }),
    createUserLastAccess: publicProcedure
      .input(insertUserLastAccessParams)
      .mutation(async ({ input }) => {
        return createUserLastAccess(input);
      }),
    updateUserLastAccess: publicProcedure
      .input(updateUserLastAccessParams)
      .mutation(async ({ input }) => {
        return updateUserLastAccess(input.id, input);
      }),
    deleteUserLastAccess: publicProcedure
      .input(userLastAccessIdSchema)
      .mutation(async ({ input }) => {
        return deleteUserLastAccess(input.id);
      }),
  });
