import type {
  NewPortfolioTempdataParams,
  PortfolioTempdataId,
  UpdatePortfolioTempdataParams,
} from "@soco/portfolio-db/schema/portfolioTempdatas";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/portfolio-db";
import { db } from "@soco/portfolio-db/client";
import {
  insertPortfolioTempdataSchema,
  portfolioTempdataIdSchema,
  portfolioTempdatas,
  updatePortfolioTempdataSchema,
} from "@soco/portfolio-db/schema/portfolioTempdatas";

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
