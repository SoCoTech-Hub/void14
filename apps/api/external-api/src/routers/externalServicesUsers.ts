import { getExternalServicesUserById, getExternalServicesUsers } from "../api/externalServicesUsers/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  externalServicesUserIdSchema,
  insertExternalServicesUserParams,
  updateExternalServicesUserParams,
} from "@soco/external-db/schema/externalServicesUsers";
import { createExternalServicesUser, deleteExternalServicesUser, updateExternalServicesUser } from "../api/externalServicesUsers/mutations";

export const externalServicesUsersRouter =createTRPCRouter({
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
