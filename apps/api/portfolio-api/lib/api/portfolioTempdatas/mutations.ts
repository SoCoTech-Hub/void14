import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertPortfolioTempdataSchema,
  NewPortfolioTempdataParams,
  PortfolioTempdataId,
  portfolioTempdataIdSchema,
  portfolioTempdatas,
  UpdatePortfolioTempdataParams,
  updatePortfolioTempdataSchema,
} from "../db/schema/portfolioTempdatas";

export const createPortfolioTempdata = async (
  portfolioTempdata: NewPortfolioTempdataParams,
) => {
  const { session } = await getUserAuth();
  const newPortfolioTempdata = insertPortfolioTempdataSchema.parse({
    ...portfolioTempdata,
    userId: session?.user.id!,
  });
  try {
    const [p] = await db
      .insert(portfolioTempdatas)
      .values(newPortfolioTempdata)
      .returning();
    return { portfolioTempdata: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePortfolioTempdata = async (
  id: PortfolioTempdataId,
  portfolioTempdata: UpdatePortfolioTempdataParams,
) => {
  const { session } = await getUserAuth();
  const { id: portfolioTempdataId } = portfolioTempdataIdSchema.parse({ id });
  const newPortfolioTempdata = updatePortfolioTempdataSchema.parse({
    ...portfolioTempdata,
    userId: session?.user.id!,
  });
  try {
    const [p] = await db
      .update(portfolioTempdatas)
      .set(newPortfolioTempdata)
      .where(
        and(
          eq(portfolioTempdatas.id, portfolioTempdataId!),
          eq(portfolioTempdatas.userId, session?.user.id!),
        ),
      )
      .returning();
    return { portfolioTempdata: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePortfolioTempdata = async (id: PortfolioTempdataId) => {
  const { session } = await getUserAuth();
  const { id: portfolioTempdataId } = portfolioTempdataIdSchema.parse({ id });
  try {
    const [p] = await db
      .delete(portfolioTempdatas)
      .where(
        and(
          eq(portfolioTempdatas.id, portfolioTempdataId!),
          eq(portfolioTempdatas.userId, session?.user.id!),
        ),
      )
      .returning();
    return { portfolioTempdata: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
