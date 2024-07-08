import { db } from "@soco/zoom-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ZoomMeetingId, zoomMeetingIdSchema, zoomMeetings } from "@soco/zoom-db/schema/zoomMeetings";
import { zooms } from "@soco/zoom-db/schema/zooms";

export const getZoomMeetings = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ zoomMeeting: zoomMeetings, zoom: zooms }).from(zoomMeetings).leftJoin(zooms, eq(zoomMeetings.zoomId, zooms.id)).where(eq(zoomMeetings.userId, session?.user.id!));
  const z = rows .map((r) => ({ ...r.zoomMeeting, zoom: r.zoom})); 
  return { zoomMeetings: z };
};

export const getZoomMeetingById = async (id: ZoomMeetingId) => {
  const { session } = await getUserAuth();
  const { id: zoomMeetingId } = zoomMeetingIdSchema.parse({ id });
  const [row] = await db.select({ zoomMeeting: zoomMeetings, zoom: zooms }).from(zoomMeetings).where(and(eq(zoomMeetings.id, zoomMeetingId), eq(zoomMeetings.userId, session?.user.id!))).leftJoin(zooms, eq(zoomMeetings.zoomId, zooms.id));
  if (row === undefined) return {};
  const z =  { ...row.zoomMeeting, zoom: row.zoom } ;
  return { zoomMeeting: z };
};


