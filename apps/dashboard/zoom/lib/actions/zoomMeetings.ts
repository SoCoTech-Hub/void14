"use server";

import { revalidatePath } from "next/cache";
import {
  createZoomMeeting,
  deleteZoomMeeting,
  updateZoomMeeting,
} from "@/lib/api/zoomMeetings/mutations";
import {
  ZoomMeetingId,
  NewZoomMeetingParams,
  UpdateZoomMeetingParams,
  zoomMeetingIdSchema,
  insertZoomMeetingParams,
  updateZoomMeetingParams,
} from "@/lib/db/schema/zoomMeetings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateZoomMeetings = () => revalidatePath("/zoom-meetings");

export const createZoomMeetingAction = async (input: NewZoomMeetingParams) => {
  try {
    const payload = insertZoomMeetingParams.parse(input);
    await createZoomMeeting(payload);
    revalidateZoomMeetings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateZoomMeetingAction = async (input: UpdateZoomMeetingParams) => {
  try {
    const payload = updateZoomMeetingParams.parse(input);
    await updateZoomMeeting(payload.id, payload);
    revalidateZoomMeetings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteZoomMeetingAction = async (input: ZoomMeetingId) => {
  try {
    const payload = zoomMeetingIdSchema.parse({ id: input });
    await deleteZoomMeeting(payload.id);
    revalidateZoomMeetings();
  } catch (e) {
    return handleErrors(e);
  }
};