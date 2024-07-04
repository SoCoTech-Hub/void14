"use server";

import { revalidatePath } from "next/cache";

import {
  createPortfolioLog,
  deletePortfolioLog,
  updatePortfolioLog,
} from "../api/portfolioLogs/mutations";
import {
  insertPortfolioLogParams,
  NewPortfolioLogParams,
  PortfolioLogId,
  portfolioLogIdSchema,
  UpdatePortfolioLogParams,
  updatePortfolioLogParams,
} from "../db/schema/portfolioLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePortfolioLogs = () => revalidatePath("/portfolio-logs");

export const createPortfolioLogAction = async (
  input: NewPortfolioLogParams,
) => {
  try {
    const payload = insertPortfolioLogParams.parse(input);
    await createPortfolioLog(payload);
    revalidatePortfolioLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePortfolioLogAction = async (
  input: UpdatePortfolioLogParams,
) => {
  try {
    const payload = updatePortfolioLogParams.parse(input);
    await updatePortfolioLog(payload.id, payload);
    revalidatePortfolioLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePortfolioLogAction = async (input: PortfolioLogId) => {
  try {
    const payload = portfolioLogIdSchema.parse({ id: input });
    await deletePortfolioLog(payload.id);
    revalidatePortfolioLogs();
  } catch (e) {
    return handleErrors(e);
  }
};
