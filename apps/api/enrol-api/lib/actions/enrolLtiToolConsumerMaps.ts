"use server";

import { revalidatePath } from "next/cache";

import {
  createEnrolLtiToolConsumerMap,
  deleteEnrolLtiToolConsumerMap,
  updateEnrolLtiToolConsumerMap,
} from "../api/enrolLtiToolConsumerMaps/mutations";
import {
  EnrolLtiToolConsumerMapId,
  enrolLtiToolConsumerMapIdSchema,
  insertEnrolLtiToolConsumerMapParams,
  NewEnrolLtiToolConsumerMapParams,
  UpdateEnrolLtiToolConsumerMapParams,
  updateEnrolLtiToolConsumerMapParams,
} from "../db/schema/enrolLtiToolConsumerMaps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiToolConsumerMaps = () =>
  revalidatePath("/enrol-lti-tool-consumer-maps");

export const createEnrolLtiToolConsumerMapAction = async (
  input: NewEnrolLtiToolConsumerMapParams,
) => {
  try {
    const payload = insertEnrolLtiToolConsumerMapParams.parse(input);
    await createEnrolLtiToolConsumerMap(payload);
    revalidateEnrolLtiToolConsumerMaps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiToolConsumerMapAction = async (
  input: UpdateEnrolLtiToolConsumerMapParams,
) => {
  try {
    const payload = updateEnrolLtiToolConsumerMapParams.parse(input);
    await updateEnrolLtiToolConsumerMap(payload.id, payload);
    revalidateEnrolLtiToolConsumerMaps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiToolConsumerMapAction = async (
  input: EnrolLtiToolConsumerMapId,
) => {
  try {
    const payload = enrolLtiToolConsumerMapIdSchema.parse({ id: input });
    await deleteEnrolLtiToolConsumerMap(payload.id);
    revalidateEnrolLtiToolConsumerMaps();
  } catch (e) {
    return handleErrors(e);
  }
};
