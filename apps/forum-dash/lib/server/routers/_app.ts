import { router } from '@/lib/server/trpc'
import { forumsRouter } from './forums'
import { forumDigestsRouter } from './forumDigests'
import { forumDiscussionSubsRouter } from './forumDiscussionSubs'
import { forumDiscussionsRouter } from './forumDiscussions'
import { forumGradesRouter } from './forumGrades'
import { forumPostsRouter } from './forumPosts'
import { forumQueuesRouter } from './forumQueues'
import { forumReadsRouter } from './forumReads'
import { forumSubscriptionsRouter } from './forumSubscriptions'
import { forumTrackPrefsRouter } from './forumTrackPrefs'

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
	forumTrackPrefs: forumTrackPrefsRouter
})

export type AppRouter = typeof appRouter
