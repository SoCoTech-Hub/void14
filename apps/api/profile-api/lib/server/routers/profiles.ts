import {
  createProfile,
  deleteProfile,
  updateProfile,
} from "../api/profiles/mutations";
import { getProfileById, getProfiles } from "../api/profiles/queries";
import {
  insertProfileParams,
  profileIdSchema,
  updateProfileParams,
} from "../db/schema/profiles";
import { publicProcedure, router } from "../server/trpc";

export const profilesRouter = router({
  getProfiles: publicProcedure.query(async () => {
    return getProfiles();
  }),
  getProfileById: publicProcedure
    .input(profileIdSchema)
    .query(async ({ input }) => {
      return getProfileById(input.id);
    }),
  createProfile: publicProcedure
    .input(insertProfileParams)
    .mutation(async ({ input }) => {
      return createProfile(input);
    }),
  updateProfile: publicProcedure
    .input(updateProfileParams)
    .mutation(async ({ input }) => {
      return updateProfile(input.id, input);
    }),
  deleteProfile: publicProcedure
    .input(profileIdSchema)
    .mutation(async ({ input }) => {
      return deleteProfile(input.id);
    }),
});
