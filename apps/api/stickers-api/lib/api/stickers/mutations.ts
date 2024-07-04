import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertStickerSchema,
  NewStickerParams,
  StickerId,
  stickerIdSchema,
  stickers,
  UpdateStickerParams,
  updateStickerSchema,
} from "../db/schema/stickers";

export const createSticker = async (sticker: NewStickerParams) => {
  const newSticker = insertStickerSchema.parse(sticker);
  try {
    const [s] = await db.insert(stickers).values(newSticker).returning();
    return { sticker: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSticker = async (
  id: StickerId,
  sticker: UpdateStickerParams,
) => {
  const { id: stickerId } = stickerIdSchema.parse({ id });
  const newSticker = updateStickerSchema.parse(sticker);
  try {
    const [s] = await db
      .update(stickers)
      .set(newSticker)
      .where(eq(stickers.id, stickerId!))
      .returning();
    return { sticker: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSticker = async (id: StickerId) => {
  const { id: stickerId } = stickerIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(stickers)
      .where(eq(stickers.id, stickerId!))
      .returning();
    return { sticker: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
