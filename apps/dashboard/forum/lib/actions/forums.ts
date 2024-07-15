"use server";

import { revalidatePath } from "next/cache";
import {
  createForum,
  deleteForum,
  updateForum,
} from "@/lib/api/forums/mutations";
import {
  ForumId,
  NewForumParams,
  UpdateForumParams,
  forumIdSchema,
  insertForumParams,
  updateForumParams,
} from "@/lib/db/schema/forums";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForums = () => revalidatePath("/forums");

export const createForumAction = async (input: NewForumParams) => {
  try {
    const payload = insertForumParams.parse(input);
    await createForum(payload);
    revalidateForums();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumAction = async (input: UpdateForumParams) => {
  try {
    const payload = updateForumParams.parse(input);
    await updateForum(payload.id, payload);
    revalidateForums();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumAction = async (input: ForumId) => {
  try {
    const payload = forumIdSchema.parse({ id: input });
    await deleteForum(payload.id);
    revalidateForums();
  } catch (e) {
    return handleErrors(e);
  }
};
