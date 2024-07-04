"use server";

import { revalidatePath } from "next/cache";

import { createZoom, deleteZoom, updateZoom } from "../api/zooms/mutations";
import {
  insertZoomParams,
  NewZoomParams,
  UpdateZoomParams,
  updateZoomParams,
  ZoomId,
  zoomIdSchema,
} from "../db/schema/zooms";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateZooms = () => revalidatePath("/zooms");

export const createZoomAction = async (input: NewZoomParams) => {
  try {
    const payload = insertZoomParams.parse(input);
    await createZoom(payload);
    revalidateZooms();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateZoomAction = async (input: UpdateZoomParams) => {
  try {
    const payload = updateZoomParams.parse(input);
    await updateZoom(payload.id, payload);
    revalidateZooms();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteZoomAction = async (input: ZoomId) => {
  try {
    const payload = zoomIdSchema.parse({ id: input });
    await deleteZoom(payload.id);
    revalidateZooms();
  } catch (e) {
    return handleErrors(e);
  }
};
