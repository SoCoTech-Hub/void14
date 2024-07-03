import { router } from '@/lib/server/trpc'
import { zoomsRouter } from './zooms'
import { zoomMeetingsRouter } from './zoomMeetings'
import { zoomLessonsRouter } from './zoomLessons'

export const appRouter = router({
	zooms: zoomsRouter,
	zoomMeetings: zoomMeetingsRouter,
	zoomLessons: zoomLessonsRouter
})

export type AppRouter = typeof appRouter
