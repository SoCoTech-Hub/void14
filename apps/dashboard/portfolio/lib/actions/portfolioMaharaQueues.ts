"use server";

import { revalidatePath } from "next/cache";
import {
  createPortfolioMaharaQueue,
  deletePortfolioMaharaQueue,
  updatePortfolioMaharaQueue,
} from "@/lib/api/portfolioMaharaQueues/mutations";
import {
  PortfolioMaharaQueueId,
  NewPortfolioMaharaQueueParams,
  UpdatePortfolioMaharaQueueParams,
  portfolioMaharaQueueIdSchema,
  insertPortfolioMaharaQueueParams,
  updatePortfolioMaharaQueueParams,
} from "@/lib/db/schema/portfolioMaharaQueues";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePortfolioMaharaQueues = () => revalidatePath("/portfolio-mahara-queues");

export const createPortfolioMaharaQueueAction = async (input: NewPortfolioMaharaQueueParams) => {
  try {
    const payload = insertPortfolioMaharaQueueParams.parse(input);
    await createPortfolioMaharaQueue(payload);
    revalidatePortfolioMaharaQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePortfolioMaharaQueueAction = async (input: UpdatePortfolioMaharaQueueParams) => {
  try {
    const payload = updatePortfolioMaharaQueueParams.parse(input);
    await updatePortfolioMaharaQueue(payload.id, payload);
    revalidatePortfolioMaharaQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePortfolioMaharaQueueAction = async (input: PortfolioMaharaQueueId) => {
  try {
    const payload = portfolioMaharaQueueIdSchema.parse({ id: input });
    await deletePortfolioMaharaQueue(payload.id);
    revalidatePortfolioMaharaQueues();
  } catch (e) {
    return handleErrors(e);
  }
};
