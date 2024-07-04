"use server";

import { revalidatePath } from "next/cache";

import {
  createSupportTopic,
  deleteSupportTopic,
  updateSupportTopic,
} from "../api/supportTopics/mutations";
import {
  insertSupportTopicParams,
  NewSupportTopicParams,
  SupportTopicId,
  supportTopicIdSchema,
  UpdateSupportTopicParams,
  updateSupportTopicParams,
} from "../db/schema/supportTopics";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSupportTopics = () => revalidatePath("/support-topics");

export const createSupportTopicAction = async (
  input: NewSupportTopicParams,
) => {
  try {
    const payload = insertSupportTopicParams.parse(input);
    await createSupportTopic(payload);
    revalidateSupportTopics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSupportTopicAction = async (
  input: UpdateSupportTopicParams,
) => {
  try {
    const payload = updateSupportTopicParams.parse(input);
    await updateSupportTopic(payload.id, payload);
    revalidateSupportTopics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSupportTopicAction = async (input: SupportTopicId) => {
  try {
    const payload = supportTopicIdSchema.parse({ id: input });
    await deleteSupportTopic(payload.id);
    revalidateSupportTopics();
  } catch (e) {
    return handleErrors(e);
  }
};
