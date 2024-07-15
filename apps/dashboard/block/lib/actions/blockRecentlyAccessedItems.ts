"use server";

import { revalidatePath } from "next/cache";
import {
  createBlockRecentlyAccessedItem,
  deleteBlockRecentlyAccessedItem,
  updateBlockRecentlyAccessedItem,
} from "@/lib/api/blockRecentlyAccessedItems/mutations";
import {
  BlockRecentlyAccessedItemId,
  NewBlockRecentlyAccessedItemParams,
  UpdateBlockRecentlyAccessedItemParams,
  blockRecentlyAccessedItemIdSchema,
  insertBlockRecentlyAccessedItemParams,
  updateBlockRecentlyAccessedItemParams,
} from "@/lib/db/schema/blockRecentlyAccessedItems";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlockRecentlyAccessedItems = () => revalidatePath("/block-recently-accessed-items");

export const createBlockRecentlyAccessedItemAction = async (input: NewBlockRecentlyAccessedItemParams) => {
  try {
    const payload = insertBlockRecentlyAccessedItemParams.parse(input);
    await createBlockRecentlyAccessedItem(payload);
    revalidateBlockRecentlyAccessedItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlockRecentlyAccessedItemAction = async (input: UpdateBlockRecentlyAccessedItemParams) => {
  try {
    const payload = updateBlockRecentlyAccessedItemParams.parse(input);
    await updateBlockRecentlyAccessedItem(payload.id, payload);
    revalidateBlockRecentlyAccessedItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlockRecentlyAccessedItemAction = async (input: BlockRecentlyAccessedItemId) => {
  try {
    const payload = blockRecentlyAccessedItemIdSchema.parse({ id: input });
    await deleteBlockRecentlyAccessedItem(payload.id);
    revalidateBlockRecentlyAccessedItems();
  } catch (e) {
    return handleErrors(e);
  }
};
