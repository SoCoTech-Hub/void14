"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizSlot,
  deleteQuizSlot,
  updateQuizSlot,
} from "@/lib/api/quizSlots/mutations";
import {
  QuizSlotId,
  NewQuizSlotParams,
  UpdateQuizSlotParams,
  quizSlotIdSchema,
  insertQuizSlotParams,
  updateQuizSlotParams,
} from "@/lib/db/schema/quizSlots";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizSlots = () => revalidatePath("/quiz-slots");

export const createQuizSlotAction = async (input: NewQuizSlotParams) => {
  try {
    const payload = insertQuizSlotParams.parse(input);
    await createQuizSlot(payload);
    revalidateQuizSlots();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizSlotAction = async (input: UpdateQuizSlotParams) => {
  try {
    const payload = updateQuizSlotParams.parse(input);
    await updateQuizSlot(payload.id, payload);
    revalidateQuizSlots();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizSlotAction = async (input: QuizSlotId) => {
  try {
    const payload = quizSlotIdSchema.parse({ id: input });
    await deleteQuizSlot(payload.id);
    revalidateQuizSlots();
  } catch (e) {
    return handleErrors(e);
  }
};