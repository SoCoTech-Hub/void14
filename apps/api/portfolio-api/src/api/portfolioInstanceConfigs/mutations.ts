import { db } from "@soco/portfolio-db/index";
import { eq } from "drizzle-orm";
import { 
  PortfolioInstanceConfigId, 
  NewPortfolioInstanceConfigParams,
  UpdatePortfolioInstanceConfigParams, 
  updatePortfolioInstanceConfigSchema,
  insertPortfolioInstanceConfigSchema, 
  portfolioInstanceConfigs,
  portfolioInstanceConfigIdSchema 
} from "@soco/portfolio-db/schema/portfolioInstanceConfigs";

export const createPortfolioInstanceConfig = async (portfolioInstanceConfig: NewPortfolioInstanceConfigParams) => {
  const newPortfolioInstanceConfig = insertPortfolioInstanceConfigSchema.parse(portfolioInstanceConfig);
  try {
    const [p] =  await db.insert(portfolioInstanceConfigs).values(newPortfolioInstanceConfig).returning();
    return { portfolioInstanceConfig: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePortfolioInstanceConfig = async (id: PortfolioInstanceConfigId, portfolioInstanceConfig: UpdatePortfolioInstanceConfigParams) => {
  const { id: portfolioInstanceConfigId } = portfolioInstanceConfigIdSchema.parse({ id });
  const newPortfolioInstanceConfig = updatePortfolioInstanceConfigSchema.parse(portfolioInstanceConfig);
  try {
    const [p] =  await db
     .update(portfolioInstanceConfigs)
     .set(newPortfolioInstanceConfig)
     .where(eq(portfolioInstanceConfigs.id, portfolioInstanceConfigId!))
     .returning();
    return { portfolioInstanceConfig: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePortfolioInstanceConfig = async (id: PortfolioInstanceConfigId) => {
  const { id: portfolioInstanceConfigId } = portfolioInstanceConfigIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(portfolioInstanceConfigs).where(eq(portfolioInstanceConfigs.id, portfolioInstanceConfigId!))
    .returning();
    return { portfolioInstanceConfig: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

