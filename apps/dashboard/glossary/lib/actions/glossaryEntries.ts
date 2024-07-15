"use server";

import { revalidatePath } from "next/cache";
import {
  createGlossaryEntry,
  deleteGlossaryEntry,
  updateGlossaryEntry,
} from "@/lib/api/glossaryEntries/mutations";
import {
  GlossaryEntryId,
  NewGlossaryEntryParams,
  UpdateGlossaryEntryParams,
  glossaryEntryIdSchema,
  insertGlossaryEntryParams,
  updateGlossaryEntryParams,
} from "@/lib/db/schema/glossaryEntries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGlossaryEntries = () => revalidatePath("/glossary-entries");

export const createGlossaryEntryAction = async (input: NewGlossaryEntryParams) => {
  try {
    const payload = insertGlossaryEntryParams.parse(input);
    await createGlossaryEntry(payload);
    revalidateGlossaryEntries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGlossaryEntryAction = async (input: UpdateGlossaryEntryParams) => {
  try {
    const payload = updateGlossaryEntryParams.parse(input);
    await updateGlossaryEntry(payload.id, payload);
    revalidateGlossaryEntries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGlossaryEntryAction = async (input: GlossaryEntryId) => {
  try {
    const payload = glossaryEntryIdSchema.parse({ id: input });
    await deleteGlossaryEntry(payload.id);
    revalidateGlossaryEntries();
  } catch (e) {
    return handleErrors(e);
  }
};
