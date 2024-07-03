import { getLocalizationUserById, getLocalizationUsers } from "@/lib/api/localizationUsers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  localizationUserIdSchema,
  insertLocalizationUserParams,
  updateLocalizationUserParams,
} from "@/lib/db/schema/localizationUsers";
import { createLocalizationUser, deleteLocalizationUser, updateLocalizationUser } from "@/lib/api/localizationUsers/mutations";

export const localizationUsersRouter = router({
  getLocalizationUsers: publicProcedure.query(async () => {
    return getLocalizationUsers();
  }),
  getLocalizationUserById: publicProcedure.input(localizationUserIdSchema).query(async ({ input }) => {
    return getLocalizationUserById(input.id);
  }),
  createLocalizationUser: publicProcedure
    .input(insertLocalizationUserParams)
    .mutation(async ({ input }) => {
      return createLocalizationUser(input);
    }),
  updateLocalizationUser: publicProcedure
    .input(updateLocalizationUserParams)
    .mutation(async ({ input }) => {
      return updateLocalizationUser(input.id, input);
    }),
  deleteLocalizationUser: publicProcedure
    .input(localizationUserIdSchema)
    .mutation(async ({ input }) => {
      return deleteLocalizationUser(input.id);
    }),
});
