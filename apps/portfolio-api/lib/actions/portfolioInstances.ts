"use server";

import { revalidatePath } from "next/cache";
import {
  createPortfolioInstance,
  deletePortfolioInstance,
  updatePortfolioInstance,
} from "@/lib/api/portfolioInstances/mutations";
import {
  PortfolioInstanceId,
  NewPortfolioInstanceParams,
  UpdatePortfolioInstanceParams,
  portfolioInstanceIdSchema,
  insertPortfolioInstanceParams,
  updatePortfolioInstanceParams,
} from "@/lib/db/schema/portfolioInstances";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePortfolioInstances = () => revalidatePath("/portfolio-instances");

export const createPortfolioInstanceAction = async (input: NewPortfolioInstanceParams) => {
  try {
    const payload = insertPortfolioInstanceParams.parse(input);
    await createPortfolioInstance(payload);
    revalidatePortfolioInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePortfolioInstanceAction = async (input: UpdatePortfolioInstanceParams) => {
  try {
    const payload = updatePortfolioInstanceParams.parse(input);
    await updatePortfolioInstance(payload.id, payload);
    revalidatePortfolioInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePortfolioInstanceAction = async (input: PortfolioInstanceId) => {
  try {
    const payload = portfolioInstanceIdSchema.parse({ id: input });
    await deletePortfolioInstance(payload.id);
    revalidatePortfolioInstances();
  } catch (e) {
    return handleErrors(e);
  }
};