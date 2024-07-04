import {
  createUserLastAccess,
  deleteUserLastAccess,
  updateUserLastAccess,
} from "../api/userLastAccesses/mutations";
import {
  getUserLastAccessById,
  getUserLastAccesses,
} from "../api/userLastAccesses/queries";
import {
  insertUserLastAccessParams,
  updateUserLastAccessParams,
  userLastAccessIdSchema,
} from "../db/schema/userLastAccesses";
import { publicProcedure, router } from "../server/trpc";

export const userLastAccessesRouter = router({
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
