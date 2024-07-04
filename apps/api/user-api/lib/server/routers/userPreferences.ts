import {
  createUserPreference,
  deleteUserPreference,
  updateUserPreference,
} from "../api/userPreferences/mutations";
import {
  getUserPreferenceById,
  getUserPreferences,
} from "../api/userPreferences/queries";
import {
  insertUserPreferenceParams,
  updateUserPreferenceParams,
  userPreferenceIdSchema,
} from "../db/schema/userPreferences";
import { publicProcedure, router } from "../server/trpc";

export const userPreferencesRouter = router({
  getUserPreferences: publicProcedure.query(async () => {
    return getUserPreferences();
  }),
  getUserPreferenceById: publicProcedure
    .input(userPreferenceIdSchema)
    .query(async ({ input }) => {
      return getUserPreferenceById(input.id);
    }),
  createUserPreference: publicProcedure
    .input(insertUserPreferenceParams)
    .mutation(async ({ input }) => {
      return createUserPreference(input);
    }),
  updateUserPreference: publicProcedure
    .input(updateUserPreferenceParams)
    .mutation(async ({ input }) => {
      return updateUserPreference(input.id, input);
    }),
  deleteUserPreference: publicProcedure
    .input(userPreferenceIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserPreference(input.id);
    }),
});
