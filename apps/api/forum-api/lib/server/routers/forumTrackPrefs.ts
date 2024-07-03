import { getForumTrackPrefById, getForumTrackPrefs } from "@/lib/api/forumTrackPrefs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumTrackPrefIdSchema,
  insertForumTrackPrefParams,
  updateForumTrackPrefParams,
} from "@/lib/db/schema/forumTrackPrefs";
import { createForumTrackPref, deleteForumTrackPref, updateForumTrackPref } from "@/lib/api/forumTrackPrefs/mutations";

export const forumTrackPrefsRouter = router({
  getForumTrackPrefs: publicProcedure.query(async () => {
    return getForumTrackPrefs();
  }),
  getForumTrackPrefById: publicProcedure.input(forumTrackPrefIdSchema).query(async ({ input }) => {
    return getForumTrackPrefById(input.id);
  }),
  createForumTrackPref: publicProcedure
    .input(insertForumTrackPrefParams)
    .mutation(async ({ input }) => {
      return createForumTrackPref(input);
    }),
  updateForumTrackPref: publicProcedure
    .input(updateForumTrackPrefParams)
    .mutation(async ({ input }) => {
      return updateForumTrackPref(input.id, input);
    }),
  deleteForumTrackPref: publicProcedure
    .input(forumTrackPrefIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumTrackPref(input.id);
    }),
});
