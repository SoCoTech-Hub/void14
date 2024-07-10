import { db } from "@soco/portfolio-db/client";
import { eq } from "@soco/portfolio-db";
import { 
  PortfolioInstanceId, 
  NewPortfolioInstanceParams,
  UpdatePortfolioInstanceParams, 
  updatePortfolioInstanceSchema,
  insertPortfolioInstanceSchema, 
  portfolioInstances,
  portfolioInstanceIdSchema 
} from "@soco/portfolio-db/schema/portfolioInstances";

export const createPortfolioInstance = async (portfolioInstance: NewPortfolioInstanceParams) => {
  const newPortfolioInstance = insertPortfolioInstanceSchema.parse(portfolioInstance);
  try {
    const [p] =  await db.insert(portfolioInstances).values(newPortfolioInstance).returning();
    return { portfolioInstance: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePortfolioInstance = async (id: PortfolioInstanceId, portfolioInstance: UpdatePortfolioInstanceParams) => {
  const { id: portfolioInstanceId } = portfolioInstanceIdSchema.parse({ id });
  const newPortfolioInstance = updatePortfolioInstanceSchema.parse(portfolioInstance);
  try {
    const [p] =  await db
     .update(portfolioInstances)
     .set(newPortfolioInstance)
     .where(eq(portfolioInstances.id, portfolioInstanceId!))
     .returning();
    return { portfolioInstance: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePortfolioInstance = async (id: PortfolioInstanceId) => {
  const { id: portfolioInstanceId } = portfolioInstanceIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(portfolioInstances).where(eq(portfolioInstances.id, portfolioInstanceId!))
    .returning();
    return { portfolioInstance: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

