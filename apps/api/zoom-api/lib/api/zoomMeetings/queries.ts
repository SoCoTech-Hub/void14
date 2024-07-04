import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ZoomMeetingId } from "../db/schema/zoomMeetings";
import { db } from "../db/index";
import { zoomMeetingIdSchema, zoomMeetings } from "../db/schema/zoomMeetings";
import { zooms } from "../db/schema/zooms";

export const getZoomMeetings = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ zoomMeeting: zoomMeetings, zoom: zooms })
    .from(zoomMeetings)
    .leftJoin(zooms, eq(zoomMeetings.zoomId, zooms.id))
    .where(eq(zoomMeetings.userId, session?.user.id!));
  const z = rows.map((r) => ({ ...r.zoomMeeting, zoom: r.zoom }));
  return { zoomMeetings: z };
};

export const getZoomMeetingById = async (id: ZoomMeetingId) => {
  const { session } = await getUserAuth();
  const { id: zoomMeetingId } = zoomMeetingIdSchema.parse({ id });
  const [row] = await db
    .select({ zoomMeeting: zoomMeetings, zoom: zooms })
    .from(zoomMeetings)
    .where(
      and(
        eq(zoomMeetings.id, zoomMeetingId),
        eq(zoomMeetings.userId, session?.user.id!),
      ),
    )
    .leftJoin(zooms, eq(zoomMeetings.zoomId, zooms.id));
  if (row === undefined) return {};
  const z = { ...row.zoomMeeting, zoom: row.zoom };
  return { zoomMeeting: z };
};
