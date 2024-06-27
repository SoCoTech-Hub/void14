"use server";

import { revalidatePath } from "next/cache";
import {
  createPortfolioTempdata,
  deletePortfolioTempdata,
  updatePortfolioTempdata,
} from "@/lib/api/portfolioTempdatas/mutations";
import {
  PortfolioTempdataId,
  NewPortfolioTempdataParams,
  UpdatePortfolioTempdataParams,
  portfolioTempdataIdSchema,
  insertPortfolioTempdataParams,
  updatePortfolioTempdataParams,
} from "@/lib/db/schema/portfolioTempdatas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePortfolioTempdatas = () => revalidatePath("/portfolio-tempdatas");

export const createPortfolioTempdataAction = async (input: NewPortfolioTempdataParams) => {
  try {
    const payload = insertPortfolioTempdataParams.parse(input);
    await createPortfolioTempdata(payload);
    revalidatePortfolioTempdatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePortfolioTempdataAction = async (input: UpdatePortfolioTempdataParams) => {
  try {
    const payload = updatePortfolioTempdataParams.parse(input);
    await updatePortfolioTempdata(payload.id, payload);
    revalidatePortfolioTempdatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePortfolioTempdataAction = async (input: PortfolioTempdataId) => {
  try {
    const payload = portfolioTempdataIdSchema.parse({ id: input });
    await deletePortfolioTempdata(payload.id);
    revalidatePortfolioTempdatas();
  } catch (e) {
    return handleErrors(e);
  }
};