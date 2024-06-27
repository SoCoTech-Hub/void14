"use server";

import { revalidatePath } from "next/cache";
import {
  createForumSubscription,
  deleteForumSubscription,
  updateForumSubscription,
} from "@/lib/api/forumSubscriptions/mutations";
import {
  ForumSubscriptionId,
  NewForumSubscriptionParams,
  UpdateForumSubscriptionParams,
  forumSubscriptionIdSchema,
  insertForumSubscriptionParams,
  updateForumSubscriptionParams,
} from "@/lib/db/schema/forumSubscriptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumSubscriptions = () => revalidatePath("/forum-subscriptions");

export const createForumSubscriptionAction = async (input: NewForumSubscriptionParams) => {
  try {
    const payload = insertForumSubscriptionParams.parse(input);
    await createForumSubscription(payload);
    revalidateForumSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumSubscriptionAction = async (input: UpdateForumSubscriptionParams) => {
  try {
    const payload = updateForumSubscriptionParams.parse(input);
    await updateForumSubscription(payload.id, payload);
    revalidateForumSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumSubscriptionAction = async (input: ForumSubscriptionId) => {
  try {
    const payload = forumSubscriptionIdSchema.parse({ id: input });
    await deleteForumSubscription(payload.id);
    revalidateForumSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};