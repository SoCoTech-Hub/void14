"use server";

import { revalidatePath } from "next/cache";
import {
  createPortfolioInstanceConfig,
  deletePortfolioInstanceConfig,
  updatePortfolioInstanceConfig,
} from "@/lib/api/portfolioInstanceConfigs/mutations";
import {
  PortfolioInstanceConfigId,
  NewPortfolioInstanceConfigParams,
  UpdatePortfolioInstanceConfigParams,
  portfolioInstanceConfigIdSchema,
  insertPortfolioInstanceConfigParams,
  updatePortfolioInstanceConfigParams,
} from "@/lib/db/schema/portfolioInstanceConfigs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePortfolioInstanceConfigs = () => revalidatePath("/portfolio-instance-configs");

export const createPortfolioInstanceConfigAction = async (input: NewPortfolioInstanceConfigParams) => {
  try {
    const payload = insertPortfolioInstanceConfigParams.parse(input);
    await createPortfolioInstanceConfig(payload);
    revalidatePortfolioInstanceConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePortfolioInstanceConfigAction = async (input: UpdatePortfolioInstanceConfigParams) => {
  try {
    const payload = updatePortfolioInstanceConfigParams.parse(input);
    await updatePortfolioInstanceConfig(payload.id, payload);
    revalidatePortfolioInstanceConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePortfolioInstanceConfigAction = async (input: PortfolioInstanceConfigId) => {
  try {
    const payload = portfolioInstanceConfigIdSchema.parse({ id: input });
    await deletePortfolioInstanceConfig(payload.id);
    revalidatePortfolioInstanceConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};