"use server";

import { revalidatePath } from "next/cache";
import {
  createUrl,
  deleteUrl,
  updateUrl,
} from "@/lib/api/urls/mutations";
import {
  UrlId,
  NewUrlParams,
  UpdateUrlParams,
  urlIdSchema,
  insertUrlParams,
  updateUrlParams,
} from "@/lib/db/schema/urls";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUrls = () => revalidatePath("/urls");

export const createUrlAction = async (input: NewUrlParams) => {
  try {
    const payload = insertUrlParams.parse(input);
    await createUrl(payload);
    revalidateUrls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUrlAction = async (input: UpdateUrlParams) => {
  try {
    const payload = updateUrlParams.parse(input);
    await updateUrl(payload.id, payload);
    revalidateUrls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUrlAction = async (input: UrlId) => {
  try {
    const payload = urlIdSchema.parse({ id: input });
    await deleteUrl(payload.id);
    revalidateUrls();
  } catch (e) {
    return handleErrors(e);
  }
};