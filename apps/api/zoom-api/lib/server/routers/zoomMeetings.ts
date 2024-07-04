import {
  createZoomMeeting,
  deleteZoomMeeting,
  updateZoomMeeting,
} from "../api/zoomMeetings/mutations";
import {
  getZoomMeetingById,
  getZoomMeetings,
} from "../api/zoomMeetings/queries";
import {
  insertZoomMeetingParams,
  updateZoomMeetingParams,
  zoomMeetingIdSchema,
} from "../db/schema/zoomMeetings";
import { publicProcedure, router } from "../server/trpc";

export const zoomMeetingsRouter = router({
  getZoomMeetings: publicProcedure.query(async () => {
    return getZoomMeetings();
  }),
  getZoomMeetingById: publicProcedure
    .input(zoomMeetingIdSchema)
    .query(async ({ input }) => {
      return getZoomMeetingById(input.id);
    }),
  createZoomMeeting: publicProcedure
    .input(insertZoomMeetingParams)
    .mutation(async ({ input }) => {
      return createZoomMeeting(input);
    }),
  updateZoomMeeting: publicProcedure
    .input(updateZoomMeetingParams)
    .mutation(async ({ input }) => {
      return updateZoomMeeting(input.id, input);
    }),
  deleteZoomMeeting: publicProcedure
    .input(zoomMeetingIdSchema)
    .mutation(async ({ input }) => {
      return deleteZoomMeeting(input.id);
    }),
});
