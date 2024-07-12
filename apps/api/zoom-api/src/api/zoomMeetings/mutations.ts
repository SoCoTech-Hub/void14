import type {
  NewZoomMeetingParams,
  UpdateZoomMeetingParams,
  ZoomMeetingId,
} from "@soco/zoom-db/schema/zoomMeetings";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/zoom-db";
import { db } from "@soco/zoom-db/client";
import {
  insertZoomMeetingSchema,
  updateZoomMeetingSchema,
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
