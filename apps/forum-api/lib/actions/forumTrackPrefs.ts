"use server";

import { revalidatePath } from "next/cache";
import {
  createForumTrackPref,
  deleteForumTrackPref,
  updateForumTrackPref,
} from "@/lib/api/forumTrackPrefs/mutations";
import {
  ForumTrackPrefId,
  NewForumTrackPrefParams,
  UpdateForumTrackPrefParams,
  forumTrackPrefIdSchema,
  insertForumTrackPrefParams,
  updateForumTrackPrefParams,
} from "@/lib/db/schema/forumTrackPrefs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumTrackPrefs = () => revalidatePath("/forum-track-prefs");

export const createForumTrackPrefAction = async (input: NewForumTrackPrefParams) => {
  try {
    const payload = insertForumTrackPrefParams.parse(input);
    await createForumTrackPref(payload);
    revalidateForumTrackPrefs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumTrackPrefAction = async (input: UpdateForumTrackPrefParams) => {
  try {
    const payload = updateForumTrackPrefParams.parse(input);
    await updateForumTrackPref(payload.id, payload);
    revalidateForumTrackPrefs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumTrackPrefAction = async (input: ForumTrackPrefId) => {
  try {
    const payload = forumTrackPrefIdSchema.parse({ id: input });
    await deleteForumTrackPref(payload.id);
    revalidateForumTrackPrefs();
  } catch (e) {
    return handleErrors(e);
  }
};