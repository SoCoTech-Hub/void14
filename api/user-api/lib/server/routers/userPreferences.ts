import { getUserPreferenceById, getUserPreferences } from "@/lib/api/userPreferences/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userPreferenceIdSchema,
  insertUserPreferenceParams,
  updateUserPreferenceParams,
} from "@/lib/db/schema/userPreferences";
import { createUserPreference, deleteUserPreference, updateUserPreference } from "@/lib/api/userPreferences/mutations";

export const userPreferencesRouter = router({
  getUserPreferences: publicProcedure.query(async () => {
    return getUserPreferences();
  }),
  getUserPreferenceById: publicProcedure.input(userPreferenceIdSchema).query(async ({ input }) => {
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
