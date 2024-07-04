import { eq } from "drizzle-orm";

import type { StickerId } from "../db/schema/stickers";
import { db } from "../db/index";
import { stickerIdSchema, stickers } from "../db/schema/stickers";

export const getStickers = async () => {
  const rows = await db.select().from(stickers);
  const s = rows;
  return { stickers: s };
};

export const getStickerById = async (id: StickerId) => {
  const { id: stickerId } = stickerIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(stickers)
    .where(eq(stickers.id, stickerId));
  if (row === undefined) return {};
  const s = row;
  return { sticker: s };
};
