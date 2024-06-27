"use server";

import { revalidatePath } from "next/cache";
import {
  createBlockPosition,
  deleteBlockPosition,
  updateBlockPosition,
} from "@/lib/api/blockPositions/mutations";
import {
  BlockPositionId,
  NewBlockPositionParams,
  UpdateBlockPositionParams,
  blockPositionIdSchema,
  insertBlockPositionParams,
  updateBlockPositionParams,
} from "@/lib/db/schema/blockPositions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlockPositions = () => revalidatePath("/block-positions");

export const createBlockPositionAction = async (input: NewBlockPositionParams) => {
  try {
    const payload = insertBlockPositionParams.parse(input);
    await createBlockPosition(payload);
    revalidateBlockPositions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlockPositionAction = async (input: UpdateBlockPositionParams) => {
  try {
    const payload = updateBlockPositionParams.parse(input);
    await updateBlockPosition(payload.id, payload);
    revalidateBlockPositions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlockPositionAction = async (input: BlockPositionId) => {
  try {
    const payload = blockPositionIdSchema.parse({ id: input });
    await deleteBlockPosition(payload.id);
    revalidateBlockPositions();
  } catch (e) {
    return handleErrors(e);
  }
};