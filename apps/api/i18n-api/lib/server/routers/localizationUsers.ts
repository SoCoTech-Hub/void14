import {
  createLocalizationUser,
  deleteLocalizationUser,
  updateLocalizationUser,
} from "../api/localizationUsers/mutations";
import {
  getLocalizationUserById,
  getLocalizationUsers,
} from "../api/localizationUsers/queries";
import {
  insertLocalizationUserParams,
  localizationUserIdSchema,
  updateLocalizationUserParams,
} from "../db/schema/localizationUsers";
import { publicProcedure, router } from "../server/trpc";

export const localizationUsersRouter = router({
  getLocalizationUsers: publicProcedure.query(async () => {
    return getLocalizationUsers();
  }),
  getLocalizationUserById: publicProcedure
    .input(localizationUserIdSchema)
    .query(async ({ input }) => {
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
