import { getProfileById, getProfiles } from "@/lib/api/profiles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  profileIdSchema,
  insertProfileParams,
  updateProfileParams,
} from "@/lib/db/schema/profiles";
import { createProfile, deleteProfile, updateProfile } from "@/lib/api/profiles/mutations";

export const profilesRouter = router({
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
