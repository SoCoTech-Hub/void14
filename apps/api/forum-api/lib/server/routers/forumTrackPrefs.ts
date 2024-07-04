import {
  createForumTrackPref,
  deleteForumTrackPref,
  updateForumTrackPref,
} from "../api/forumTrackPrefs/mutations";
import {
  getForumTrackPrefById,
  getForumTrackPrefs,
} from "../api/forumTrackPrefs/queries";
import {
  forumTrackPrefIdSchema,
  insertForumTrackPrefParams,
  updateForumTrackPrefParams,
} from "../db/schema/forumTrackPrefs";
import { publicProcedure, router } from "../server/trpc";

export const forumTrackPrefsRouter = router({
  getForumTrackPrefs: publicProcedure.query(async () => {
    return getForumTrackPrefs();
  }),
  getForumTrackPrefById: publicProcedure
    .input(forumTrackPrefIdSchema)
    .query(async ({ input }) => {
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
