import { getExternalServicesUserById, getExternalServicesUsers } from "@/lib/api/externalServicesUsers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  externalServicesUserIdSchema,
  insertExternalServicesUserParams,
  updateExternalServicesUserParams,
} from "@/lib/db/schema/externalServicesUsers";
import { createExternalServicesUser, deleteExternalServicesUser, updateExternalServicesUser } from "@/lib/api/externalServicesUsers/mutations";

export const externalServicesUsersRouter = router({
  getExternalServicesUsers: publicProcedure.query(async () => {
    return getExternalServicesUsers();
  }),
  getExternalServicesUserById: publicProcedure.input(externalServicesUserIdSchema).query(async ({ input }) => {
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
