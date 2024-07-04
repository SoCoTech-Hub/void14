"use server";

import { revalidatePath } from "next/cache";

import {
  createBookChapter,
  deleteBookChapter,
  updateBookChapter,
} from "../api/bookChapters/mutations";
import {
  BookChapterId,
  bookChapterIdSchema,
  insertBookChapterParams,
  NewBookChapterParams,
  UpdateBookChapterParams,
  updateBookChapterParams,
} from "../db/schema/bookChapters";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBookChapters = () => revalidatePath("/book-chapters");

export const createBookChapterAction = async (input: NewBookChapterParams) => {
  try {
    const payload = insertBookChapterParams.parse(input);
    await createBookChapter(payload);
    revalidateBookChapters();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBookChapterAction = async (
  input: UpdateBookChapterParams,
) => {
  try {
    const payload = updateBookChapterParams.parse(input);
    await updateBookChapter(payload.id, payload);
    revalidateBookChapters();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBookChapterAction = async (input: BookChapterId) => {
  try {
    const payload = bookChapterIdSchema.parse({ id: input });
    await deleteBookChapter(payload.id);
    revalidateBookChapters();
  } catch (e) {
    return handleErrors(e);
  }
};
