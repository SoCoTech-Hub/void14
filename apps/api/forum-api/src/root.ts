import { forumDigestsRouter } from "./routers/forumDigests";
import { forumDiscussionsRouter } from "./routers/forumDiscussions";
import { forumDiscussionSubsRouter } from "./routers/forumDiscussionSubs";
import { forumGradesRouter } from "./routers/forumGrades";
import { forumPostsRouter } from "./routers/forumPosts";
import { forumQueuesRouter } from "./routers/forumQueues";
import { forumReadsRouter } from "./routers/forumReads";
import { forumsRouter } from "./routers/forums";
import { forumSubscriptionsRouter } from "./routers/forumSubscriptions";
import { forumTrackPrefsRouter } from "./routers/forumTrackPrefs";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  forumDigests: forumDigestsRouter,
  forumDiscussions: forumDiscussionsRouter,
  forumDiscussionSubs: forumDiscussionSubsRouter,
  forumGrades: forumGradesRouter,
  forumPosts: forumPostsRouter,
  forumQueues: forumQueuesRouter,
  forumReads: forumReadsRouter,
  forums: forumsRouter,
  forumSubscriptions: forumSubscriptionsRouter,
  forumTrackPrefs: forumTrackPrefsRouter,
});

export type AppRouter = typeof appRouter;
