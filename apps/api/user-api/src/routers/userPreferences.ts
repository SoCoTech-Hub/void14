import {
  insertUserPreferenceParams,
  updateUserPreferenceParams,
  userPreferenceIdSchema,
} from "@soco/user-db/schema/userPreferences";

import {
  createUserPreference,
  deleteUserPreference,
  updateUserPreference,
} from "../api/userPreferences/mutations";
import {
  getUserPreferenceById,
  getUserPreferences,
} from "../api/userPreferences/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userPreferencesRouter = createTRPCRouter({
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
