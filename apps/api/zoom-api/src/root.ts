import { createTRPCRouter } from "./trpc";

import { zoomLessonsRouter } from './routers/zoomLessons';
import { zoomMeetingsRouter } from './routers/zoomMeetings';
import { zoomsRouter } from './routers/zooms';

export const appRouter = createTRPCRouter({
  zoomLessons: zoomLessonsRouter,
  zoomMeetings: zoomMeetingsRouter,
  zooms: zoomsRouter,
});

export type AppRouter = typeof appRouter;
