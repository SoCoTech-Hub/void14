"use server";

import { revalidatePath } from "next/cache";
import {
  createForumQueue,
  deleteForumQueue,
  updateForumQueue,
} from "@/lib/api/forumQueues/mutations";
import {
  ForumQueueId,
  NewForumQueueParams,
  UpdateForumQueueParams,
  forumQueueIdSchema,
  insertForumQueueParams,
  updateForumQueueParams,
} from "@/lib/db/schema/forumQueues";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumQueues = () => revalidatePath("/forum-queues");

export const createForumQueueAction = async (input: NewForumQueueParams) => {
  try {
    const payload = insertForumQueueParams.parse(input);
    await createForumQueue(payload);
    revalidateForumQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumQueueAction = async (input: UpdateForumQueueParams) => {
  try {
    const payload = updateForumQueueParams.parse(input);
    await updateForumQueue(payload.id, payload);
    revalidateForumQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumQueueAction = async (input: ForumQueueId) => {
  try {
    const payload = forumQueueIdSchema.parse({ id: input });
    await deleteForumQueue(payload.id);
    revalidateForumQueues();
  } catch (e) {
    return handleErrors(e);
  }
};
