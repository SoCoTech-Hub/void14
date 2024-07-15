"use server";

import { revalidatePath } from "next/cache";
import {
  createPortfolioInstanceUser,
  deletePortfolioInstanceUser,
  updatePortfolioInstanceUser,
} from "@/lib/api/portfolioInstanceUsers/mutations";
import {
  PortfolioInstanceUserId,
  NewPortfolioInstanceUserParams,
  UpdatePortfolioInstanceUserParams,
  portfolioInstanceUserIdSchema,
  insertPortfolioInstanceUserParams,
  updatePortfolioInstanceUserParams,
} from "@/lib/db/schema/portfolioInstanceUsers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePortfolioInstanceUsers = () => revalidatePath("/portfolio-instance-users");

export const createPortfolioInstanceUserAction = async (input: NewPortfolioInstanceUserParams) => {
  try {
    const payload = insertPortfolioInstanceUserParams.parse(input);
    await createPortfolioInstanceUser(payload);
    revalidatePortfolioInstanceUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePortfolioInstanceUserAction = async (input: UpdatePortfolioInstanceUserParams) => {
  try {
    const payload = updatePortfolioInstanceUserParams.parse(input);
    await updatePortfolioInstanceUser(payload.id, payload);
    revalidatePortfolioInstanceUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePortfolioInstanceUserAction = async (input: PortfolioInstanceUserId) => {
  try {
    const payload = portfolioInstanceUserIdSchema.parse({ id: input });
    await deletePortfolioInstanceUser(payload.id);
    revalidatePortfolioInstanceUsers();
  } catch (e) {
    return handleErrors(e);
  }
};
