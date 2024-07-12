import { db } from "@soco/portfolio-db/client";
import { and, eq } from "@soco/portfolio-db";
import { 
  type PortfolioLogId, 
  type NewPortfolioLogParams,
  type UpdatePortfolioLogParams, 
  updatePortfolioLogSchema,
  insertPortfolioLogSchema, 
  portfolioLogs,
  portfolioLogIdSchema 
} from "@soco/portfolio-db/schema/portfolioLogs";
import { getUserAuth } from "@soco/auth-service";

export const createPortfolioLog = async (portfolioLog: NewPortfolioLogParams) => {
  const { session } = await getUserAuth();
  const newPortfolioLog = insertPortfolioLogSchema.parse({ ...portfolioLog, userId: session?.user.id! });
  try {
    const [p] =  await db.insert(portfolioLogs).values(newPortfolioLog).returning();
    return { portfolioLog: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePortfolioLog = async (id: PortfolioLogId, portfolioLog: UpdatePortfolioLogParams) => {
  const { session } = await getUserAuth();
  const { id: portfolioLogId } = portfolioLogIdSchema.parse({ id });
  const newPortfolioLog = updatePortfolioLogSchema.parse({ ...portfolioLog, userId: session?.user.id! });
  try {
    const [p] =  await db
     .update(portfolioLogs)
     .set(newPortfolioLog)
     .where(and(eq(portfolioLogs.id, portfolioLogId!), eq(portfolioLogs.userId, session?.user.id!)))
     .returning();
    return { portfolioLog: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePortfolioLog = async (id: PortfolioLogId) => {
  const { session } = await getUserAuth();
  const { id: portfolioLogId } = portfolioLogIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(portfolioLogs).where(and(eq(portfolioLogs.id, portfolioLogId!), eq(portfolioLogs.userId, session?.user.id!)))
    .returning();
    return { portfolioLog: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

