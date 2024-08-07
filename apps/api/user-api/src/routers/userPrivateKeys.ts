import {
  insertUserPrivateKeyParams,
  updateUserPrivateKeyParams,
  userPrivateKeyIdSchema,
} from "@soco/user-db/schema/userPrivateKeys";

import {
  createUserPrivateKey,
  deleteUserPrivateKey,
  updateUserPrivateKey,
} from "../api/userPrivateKeys/mutations";
import {
  getUserPrivateKeyById,
  getUserPrivateKeys,
} from "../api/userPrivateKeys/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userPrivateKeysRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getUserPrivateKeys: publicProcedure.query(async () => {
      return getUserPrivateKeys();
    }),
    getUserPrivateKeyById: publicProcedure
      .input(userPrivateKeyIdSchema)
      .query(async ({ input }) => {
        return getUserPrivateKeyById(input.id);
      }),
    createUserPrivateKey: publicProcedure
      .input(insertUserPrivateKeyParams)
      .mutation(async ({ input }) => {
        return createUserPrivateKey(input);
      }),
    updateUserPrivateKey: publicProcedure
      .input(updateUserPrivateKeyParams)
      .mutation(async ({ input }) => {
        return updateUserPrivateKey(input.id, input);
      }),
    deleteUserPrivateKey: publicProcedure
      .input(userPrivateKeyIdSchema)
      .mutation(async ({ input }) => {
        return deleteUserPrivateKey(input.id);
      }),
  });
