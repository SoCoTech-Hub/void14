import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/zoom-db/index";
import {
  insertZoomMeetingSchema,
  NewZoomMeetingParams,
  UpdateZoomMeetingParams,
  updateZoomMeetingSchema,
  ZoomMeetingId,
  zoomMeetingIdSchema,
  zoomMeetings,
} from "@soco/zoom-db/schema/zoomMeetings";

export const createZoomMeeting = async (zoomMeeting: NewZoomMeetingParams) => {
  const { session } = await getUserAuth();
  const newZoomMeeting = insertZoomMeetingSchema.parse({
    ...zoomMeeting,
    userId: session?.user.id!,
  });
  try {
    const [z] = await db
      .insert(zoomMeetings)
      .values(newZoomMeeting)
      .returning();
    return { zoomMeeting: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateZoomMeeting = async (
  id: ZoomMeetingId,
  zoomMeeting: UpdateZoomMeetingParams,
) => {
  const { session } = await getUserAuth();
  const { id: zoomMeetingId } = zoomMeetingIdSchema.parse({ id });
  const newZoomMeeting = updateZoomMeetingSchema.parse({
    ...zoomMeeting,
    userId: session?.user.id!,
  });
  try {
    const [z] = await db
      .update(zoomMeetings)
      .set(newZoomMeeting)
      .where(
        and(
          eq(zoomMeetings.id, zoomMeetingId!),
          eq(zoomMeetings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { zoomMeeting: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteZoomMeeting = async (id: ZoomMeetingId) => {
  const { session } = await getUserAuth();
  const { id: zoomMeetingId } = zoomMeetingIdSchema.parse({ id });
  try {
    const [z] = await db
      .delete(zoomMeetings)
      .where(
        and(
          eq(zoomMeetings.id, zoomMeetingId!),
          eq(zoomMeetings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { zoomMeeting: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
