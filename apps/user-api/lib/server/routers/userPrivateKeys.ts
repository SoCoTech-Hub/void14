import { getUserPrivateKeyById, getUserPrivateKeys } from "@/lib/api/userPrivateKeys/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userPrivateKeyIdSchema,
  insertUserPrivateKeyParams,
  updateUserPrivateKeyParams,
} from "@/lib/db/schema/userPrivateKeys";
import { createUserPrivateKey, deleteUserPrivateKey, updateUserPrivateKey } from "@/lib/api/userPrivateKeys/mutations";

export const userPrivateKeysRouter = router({
  getUserPrivateKeys: publicProcedure.query(async () => {
    return getUserPrivateKeys();
  }),
  getUserPrivateKeyById: publicProcedure.input(userPrivateKeyIdSchema).query(async ({ input }) => {
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
