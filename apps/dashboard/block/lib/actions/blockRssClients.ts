"use server";

import { revalidatePath } from "next/cache";
import {
  createBlockRssClient,
  deleteBlockRssClient,
  updateBlockRssClient,
} from "@/lib/api/blockRssClients/mutations";
import {
  BlockRssClientId,
  NewBlockRssClientParams,
  UpdateBlockRssClientParams,
  blockRssClientIdSchema,
  insertBlockRssClientParams,
  updateBlockRssClientParams,
} from "@/lib/db/schema/blockRssClients";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlockRssClients = () => revalidatePath("/block-rss-clients");

export const createBlockRssClientAction = async (input: NewBlockRssClientParams) => {
  try {
    const payload = insertBlockRssClientParams.parse(input);
    await createBlockRssClient(payload);
    revalidateBlockRssClients();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlockRssClientAction = async (input: UpdateBlockRssClientParams) => {
  try {
    const payload = updateBlockRssClientParams.parse(input);
    await updateBlockRssClient(payload.id, payload);
    revalidateBlockRssClients();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlockRssClientAction = async (input: BlockRssClientId) => {
  try {
    const payload = blockRssClientIdSchema.parse({ id: input });
    await deleteBlockRssClient(payload.id);
    revalidateBlockRssClients();
  } catch (e) {
    return handleErrors(e);
  }
};
