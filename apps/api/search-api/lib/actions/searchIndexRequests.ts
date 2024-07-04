"use server";

import { revalidatePath } from "next/cache";

import {
  createSearchIndexRequest,
  deleteSearchIndexRequest,
  updateSearchIndexRequest,
} from "../api/searchIndexRequests/mutations";
import {
  insertSearchIndexRequestParams,
  NewSearchIndexRequestParams,
  SearchIndexRequestId,
  searchIndexRequestIdSchema,
  UpdateSearchIndexRequestParams,
  updateSearchIndexRequestParams,
} from "../db/schema/searchIndexRequests";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSearchIndexRequests = () =>
  revalidatePath("/search-index-requests");

export const createSearchIndexRequestAction = async (
  input: NewSearchIndexRequestParams,
) => {
  try {
    const payload = insertSearchIndexRequestParams.parse(input);
    await createSearchIndexRequest(payload);
    revalidateSearchIndexRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSearchIndexRequestAction = async (
  input: UpdateSearchIndexRequestParams,
) => {
  try {
    const payload = updateSearchIndexRequestParams.parse(input);
    await updateSearchIndexRequest(payload.id, payload);
    revalidateSearchIndexRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSearchIndexRequestAction = async (
  input: SearchIndexRequestId,
) => {
  try {
    const payload = searchIndexRequestIdSchema.parse({ id: input });
    await deleteSearchIndexRequest(payload.id);
    revalidateSearchIndexRequests();
  } catch (e) {
    return handleErrors(e);
  }
};
