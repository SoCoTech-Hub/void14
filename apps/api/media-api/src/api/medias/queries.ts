import type { MediaId } from "@soco/media-db/schema/medias";
import { eq } from "@soco/media-db";
import { db } from "@soco/media-db/client";
import { mediaIdSchema, medias } from "@soco/media-db/schema/medias";

export const getMedias = async () => {
  const rows = await db.select().from(medias);
  const m = rows;
  return { medias: m };
};

export const getMediaById = async (id: MediaId) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  const [row] = await db.select().from(medias).where(eq(medias.id, mediaId));
  if (row === undefined) return {};
  const m = row;
  return { media: m };
};
