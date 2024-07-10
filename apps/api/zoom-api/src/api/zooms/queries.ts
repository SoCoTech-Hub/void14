import { db } from "@soco/zoom-db/client";
import { eq } from "@soco/zoom-db";
import { type ZoomId, zoomIdSchema, zooms } from "@soco/zoom-db/schema/zooms";

export const getZooms = async () => {
  const rows = await db.select().from(zooms);
  const z = rows
  return { zooms: z };
};

export const getZoomById = async (id: ZoomId) => {
  const { id: zoomId } = zoomIdSchema.parse({ id });
  const [row] = await db.select().from(zooms).where(eq(zooms.id, zoomId));
  if (row === undefined) return {};
  const z = row;
  return { zoom: z };
};


