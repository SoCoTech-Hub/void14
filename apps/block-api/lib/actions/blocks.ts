"use server";

import { revalidatePath } from "next/cache";
import {
  createBlock,
  deleteBlock,
  updateBlock,
} from "@/lib/api/blocks/mutations";
import {
  BlockId,
  NewBlockParams,
  UpdateBlockParams,
  blockIdSchema,
  insertBlockParams,
  updateBlockParams,
} from "@/lib/db/schema/blocks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlocks = () => revalidatePath("/blocks");

export const createBlockAction = async (input: NewBlockParams) => {
  try {
    const payload = insertBlockParams.parse(input);
    await createBlock(payload);
    revalidateBlocks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlockAction = async (input: UpdateBlockParams) => {
  try {
    const payload = updateBlockParams.parse(input);
    await updateBlock(payload.id, payload);
    revalidateBlocks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlockAction = async (input: BlockId) => {
  try {
    const payload = blockIdSchema.parse({ id: input });
    await deleteBlock(payload.id);
    revalidateBlocks();
  } catch (e) {
    return handleErrors(e);
  }
};