import type {
  MediaId,
  NewMediaParams,
  UpdateMediaParams,
} from "@soco/media-db/schema/medias";
import { eq } from "@soco/media-db";
import { db } from "@soco/media-db/client";
import {
  insertMediaSchema,
  mediaIdSchema,
  medias,
  updateMediaSchema,
} from "@soco/media-db/schema/medias";

export const createMedia = async (media: NewMediaParams) => {
  const newMedia = insertMediaSchema.parse(media);
  try {
    const [m] = await db.insert(medias).values(newMedia).returning();
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMedia = async (id: MediaId, media: UpdateMediaParams) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  const newMedia = updateMediaSchema.parse(media);
  try {
    const [m] = await db
      .update(medias)
      .set({ ...newMedia, updatedAt: new Date() })
      .where(eq(medias.id, mediaId!))
      .returning();
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMedia = async (id: MediaId) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(medias)
      .where(eq(medias.id, mediaId!))
      .returning();
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
