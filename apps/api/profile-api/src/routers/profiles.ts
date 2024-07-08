import { getProfileById, getProfiles } from "../api/profiles/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  profileIdSchema,
  insertProfileParams,
  updateProfileParams,
} from "@soco/profile-db/schema/profiles";
import { createProfile, deleteProfile, updateProfile } from "../api/profiles/mutations";

export const profilesRouter =createTRPCRouter({
  getProfiles: publicProcedure.query(async () => {
    return getProfiles();
  }),
  getProfileById: publicProcedure.input(profileIdSchema).query(async ({ input }) => {
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
