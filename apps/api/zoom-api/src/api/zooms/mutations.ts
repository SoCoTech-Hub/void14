import type {
  NewZoomParams,
  UpdateZoomParams,
  ZoomId,
} from "@soco/zoom-db/schema/zooms";
import { eq } from "@soco/zoom-db";
import { db } from "@soco/zoom-db/client";
import {
  insertZoomSchema,
  updateZoomSchema,
  zoomIdSchema,
  zooms,
} from "@soco/zoom-db/schema/zooms";

export const createZoom = async (zoom: NewZoomParams) => {
  const newZoom = insertZoomSchema.parse(zoom);
  try {
    const [z] = await db.insert(zooms).values(newZoom).returning();
    return { zoom: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateZoom = async (id: ZoomId, zoom: UpdateZoomParams) => {
  const { id: zoomId } = zoomIdSchema.parse({ id });
  const newZoom = updateZoomSchema.parse(zoom);
  try {
    const [z] = await db
      .update(zooms)
      .set(newZoom)
      .where(eq(zooms.id, zoomId!))
      .returning();
    return { zoom: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteZoom = async (id: ZoomId) => {
  const { id: zoomId } = zoomIdSchema.parse({ id });
  try {
    const [z] = await db.delete(zooms).where(eq(zooms.id, zoomId!)).returning();
    return { zoom: z };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
