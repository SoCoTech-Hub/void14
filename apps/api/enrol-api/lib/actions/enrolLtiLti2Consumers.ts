"use server";

import { revalidatePath } from "next/cache";

import {
  createEnrolLtiLti2Consumer,
  deleteEnrolLtiLti2Consumer,
  updateEnrolLtiLti2Consumer,
} from "../api/enrolLtiLti2Consumers/mutations";
import {
  EnrolLtiLti2ConsumerId,
  enrolLtiLti2ConsumerIdSchema,
  insertEnrolLtiLti2ConsumerParams,
  NewEnrolLtiLti2ConsumerParams,
  UpdateEnrolLtiLti2ConsumerParams,
  updateEnrolLtiLti2ConsumerParams,
} from "../db/schema/enrolLtiLti2Consumers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiLti2Consumers = () =>
  revalidatePath("/enrol-lti-lti2-consumers");

export const createEnrolLtiLti2ConsumerAction = async (
  input: NewEnrolLtiLti2ConsumerParams,
) => {
  try {
    const payload = insertEnrolLtiLti2ConsumerParams.parse(input);
    await createEnrolLtiLti2Consumer(payload);
    revalidateEnrolLtiLti2Consumers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiLti2ConsumerAction = async (
  input: UpdateEnrolLtiLti2ConsumerParams,
) => {
  try {
    const payload = updateEnrolLtiLti2ConsumerParams.parse(input);
    await updateEnrolLtiLti2Consumer(payload.id, payload);
    revalidateEnrolLtiLti2Consumers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiLti2ConsumerAction = async (
  input: EnrolLtiLti2ConsumerId,
) => {
  try {
    const payload = enrolLtiLti2ConsumerIdSchema.parse({ id: input });
    await deleteEnrolLtiLti2Consumer(payload.id);
    revalidateEnrolLtiLti2Consumers();
  } catch (e) {
    return handleErrors(e);
  }
};
