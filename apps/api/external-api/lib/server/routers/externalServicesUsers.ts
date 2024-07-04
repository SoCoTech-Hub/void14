import {
  createExternalServicesUser,
  deleteExternalServicesUser,
  updateExternalServicesUser,
} from "../api/externalServicesUsers/mutations";
import {
  getExternalServicesUserById,
  getExternalServicesUsers,
} from "../api/externalServicesUsers/queries";
import {
  externalServicesUserIdSchema,
  insertExternalServicesUserParams,
  updateExternalServicesUserParams,
} from "../db/schema/externalServicesUsers";
import { publicProcedure, router } from "../server/trpc";

export const externalServicesUsersRouter = router({
  getExternalServicesUsers: publicProcedure.query(async () => {
    return getExternalServicesUsers();
  }),
  getExternalServicesUserById: publicProcedure
    .input(externalServicesUserIdSchema)
    .query(async ({ input }) => {
      return getExternalServicesUserById(input.id);
    }),
  createExternalServicesUser: publicProcedure
    .input(insertExternalServicesUserParams)
    .mutation(async ({ input }) => {
      return createExternalServicesUser(input);
    }),
  updateExternalServicesUser: publicProcedure
    .input(updateExternalServicesUserParams)
    .mutation(async ({ input }) => {
      return updateExternalServicesUser(input.id, input);
    }),
  deleteExternalServicesUser: publicProcedure
    .input(externalServicesUserIdSchema)
    .mutation(async ({ input }) => {
      return deleteExternalServicesUser(input.id);
    }),
});
