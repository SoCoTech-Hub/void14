import { getUserLastAccessById, getUserLastAccesses } from "@/lib/api/userLastAccesses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userLastAccessIdSchema,
  insertUserLastAccessParams,
  updateUserLastAccessParams,
} from "@/lib/db/schema/userLastAccesses";
import { createUserLastAccess, deleteUserLastAccess, updateUserLastAccess } from "@/lib/api/userLastAccesses/mutations";

export const userLastAccessesRouter = router({
  getUserLastAccesses: publicProcedure.query(async () => {
    return getUserLastAccesses();
  }),
  getUserLastAccessById: publicProcedure.input(userLastAccessIdSchema).query(async ({ input }) => {
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
