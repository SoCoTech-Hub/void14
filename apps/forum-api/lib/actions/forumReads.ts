"use server";

import { revalidatePath } from "next/cache";
import {
  createForumRead,
  deleteForumRead,
  updateForumRead,
} from "@/lib/api/forumReads/mutations";
import {
  ForumReadId,
  NewForumReadParams,
  UpdateForumReadParams,
  forumReadIdSchema,
  insertForumReadParams,
  updateForumReadParams,
} from "@/lib/db/schema/forumReads";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumReads = () => revalidatePath("/forum-reads");

export const createForumReadAction = async (input: NewForumReadParams) => {
  try {
    const payload = insertForumReadParams.parse(input);
    await createForumRead(payload);
    revalidateForumReads();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumReadAction = async (input: UpdateForumReadParams) => {
  try {
    const payload = updateForumReadParams.parse(input);
    await updateForumRead(payload.id, payload);
    revalidateForumReads();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumReadAction = async (input: ForumReadId) => {
  try {
    const payload = forumReadIdSchema.parse({ id: input });
    await deleteForumRead(payload.id);
    revalidateForumReads();
  } catch (e) {
    return handleErrors(e);
  }
};