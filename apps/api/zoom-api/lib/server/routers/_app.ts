import { router } from "../server/trpc";
import { zoomLessonsRouter } from "./zoomLessons";
import { zoomMeetingsRouter } from "./zoomMeetings";
import { zoomsRouter } from "./zooms";

export const appRouter = router({
  zooms: zoomsRouter,
  zoomMeetings: zoomMeetingsRouter,
  zoomLessons: zoomLessonsRouter,
});

export type AppRouter = typeof appRouter;
