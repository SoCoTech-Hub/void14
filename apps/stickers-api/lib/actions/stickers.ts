"use server";

import { revalidatePath } from "next/cache";
import {
  createSticker,
  deleteSticker,
  updateSticker,
} from "@/lib/api/stickers/mutations";
import {
  StickerId,
  NewStickerParams,
  UpdateStickerParams,
  stickerIdSchema,
  insertStickerParams,
  updateStickerParams,
} from "@/lib/db/schema/stickers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStickers = () => revalidatePath("/stickers");

export const createStickerAction = async (input: NewStickerParams) => {
  try {
    const payload = insertStickerParams.parse(input);
    await createSticker(payload);
    revalidateStickers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStickerAction = async (input: UpdateStickerParams) => {
  try {
    const payload = updateStickerParams.parse(input);
    await updateSticker(payload.id, payload);
    revalidateStickers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStickerAction = async (input: StickerId) => {
  try {
    const payload = stickerIdSchema.parse({ id: input });
    await deleteSticker(payload.id);
    revalidateStickers();
  } catch (e) {
    return handleErrors(e);
  }
};