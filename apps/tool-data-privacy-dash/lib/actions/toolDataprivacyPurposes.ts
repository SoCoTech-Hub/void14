"use server";

import { revalidatePath } from "next/cache";
import {
  createToolDataprivacyPurpose,
  deleteToolDataprivacyPurpose,
  updateToolDataprivacyPurpose,
} from "@/lib/api/toolDataprivacyPurposes/mutations";
import {
  ToolDataprivacyPurposeId,
  NewToolDataprivacyPurposeParams,
  UpdateToolDataprivacyPurposeParams,
  toolDataprivacyPurposeIdSchema,
  insertToolDataprivacyPurposeParams,
  updateToolDataprivacyPurposeParams,
} from "@/lib/db/schema/toolDataprivacyPurposes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolDataprivacyPurposes = () => revalidatePath("/tool-dataprivacy-purposes");

export const createToolDataprivacyPurposeAction = async (input: NewToolDataprivacyPurposeParams) => {
  try {
    const payload = insertToolDataprivacyPurposeParams.parse(input);
    await createToolDataprivacyPurpose(payload);
    revalidateToolDataprivacyPurposes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolDataprivacyPurposeAction = async (input: UpdateToolDataprivacyPurposeParams) => {
  try {
    const payload = updateToolDataprivacyPurposeParams.parse(input);
    await updateToolDataprivacyPurpose(payload.id, payload);
    revalidateToolDataprivacyPurposes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolDataprivacyPurposeAction = async (input: ToolDataprivacyPurposeId) => {
  try {
    const payload = toolDataprivacyPurposeIdSchema.parse({ id: input });
    await deleteToolDataprivacyPurpose(payload.id);
    revalidateToolDataprivacyPurposes();
  } catch (e) {
    return handleErrors(e);
  }
};