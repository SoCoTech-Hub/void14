import { zoomLessonsRouter } from "./routers/zoomLessons";
import { zoomMeetingsRouter } from "./routers/zoomMeetings";
import { zoomsRouter } from "./routers/zooms";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  zoomLessons: zoomLessonsRouter,
  zoomMeetings: zoomMeetingsRouter,
  zooms: zoomsRouter,
});

export type AppRouter = typeof appRouter;
