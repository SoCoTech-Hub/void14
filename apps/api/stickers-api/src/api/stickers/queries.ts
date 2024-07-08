import { db } from "@soco/stickers-db/index";
import { eq } from "drizzle-orm";
import { type StickerId, stickerIdSchema, stickers } from "@soco/stickers-db/schema/stickers";

export const getStickers = async () => {
  const rows = await db.select().from(stickers);
  const s = rows
  return { stickers: s };
};

export const getStickerById = async (id: StickerId) => {
  const { id: stickerId } = stickerIdSchema.parse({ id });
  const [row] = await db.select().from(stickers).where(eq(stickers.id, stickerId));
  if (row === undefined) return {};
  const s = row;
  return { sticker: s };
};


