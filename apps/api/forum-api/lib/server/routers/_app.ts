import { router } from "../server/trpc";
import { forumDigestsRouter } from "./forumDigests";
import { forumDiscussionsRouter } from "./forumDiscussions";
import { forumDiscussionSubsRouter } from "./forumDiscussionSubs";
import { forumGradesRouter } from "./forumGrades";
import { forumPostsRouter } from "./forumPosts";
import { forumQueuesRouter } from "./forumQueues";
import { forumReadsRouter } from "./forumReads";
import { forumsRouter } from "./forums";
import { forumSubscriptionsRouter } from "./forumSubscriptions";
import { forumTrackPrefsRouter } from "./forumTrackPrefs";

export const appRouter = router({
  forums: forumsRouter,
  forumDigests: forumDigestsRouter,
  forumDiscussionSubs: forumDiscussionSubsRouter,
  forumDiscussions: forumDiscussionsRouter,
  forumGrades: forumGradesRouter,
  forumPosts: forumPostsRouter,
  forumQueues: forumQueuesRouter,
  forumReads: forumReadsRouter,
  forumSubscriptions: forumSubscriptionsRouter,
  forumTrackPrefs: forumTrackPrefsRouter,
});

export type AppRouter = typeof appRouter;
