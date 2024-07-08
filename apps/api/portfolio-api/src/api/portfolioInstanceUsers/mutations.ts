import { db } from "@soco/portfolio-db/index";
import { and, eq } from "drizzle-orm";
import { 
  PortfolioInstanceUserId, 
  NewPortfolioInstanceUserParams,
  UpdatePortfolioInstanceUserParams, 
  updatePortfolioInstanceUserSchema,
  insertPortfolioInstanceUserSchema, 
  portfolioInstanceUsers,
  portfolioInstanceUserIdSchema 
} from "@soco/portfolio-db/schema/portfolioInstanceUsers";
import { getUserAuth } from "@/lib/auth/utils";

export const createPortfolioInstanceUser = async (portfolioInstanceUser: NewPortfolioInstanceUserParams) => {
  const { session } = await getUserAuth();
  const newPortfolioInstanceUser = insertPortfolioInstanceUserSchema.parse({ ...portfolioInstanceUser, userId: session?.user.id! });
  try {
    const [p] =  await db.insert(portfolioInstanceUsers).values(newPortfolioInstanceUser).returning();
    return { portfolioInstanceUser: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePortfolioInstanceUser = async (id: PortfolioInstanceUserId, portfolioInstanceUser: UpdatePortfolioInstanceUserParams) => {
  const { session } = await getUserAuth();
  const { id: portfolioInstanceUserId } = portfolioInstanceUserIdSchema.parse({ id });
  const newPortfolioInstanceUser = updatePortfolioInstanceUserSchema.parse({ ...portfolioInstanceUser, userId: session?.user.id! });
  try {
    const [p] =  await db
     .update(portfolioInstanceUsers)
     .set(newPortfolioInstanceUser)
     .where(and(eq(portfolioInstanceUsers.id, portfolioInstanceUserId!), eq(portfolioInstanceUsers.userId, session?.user.id!)))
     .returning();
    return { portfolioInstanceUser: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePortfolioInstanceUser = async (id: PortfolioInstanceUserId) => {
  const { session } = await getUserAuth();
  const { id: portfolioInstanceUserId } = portfolioInstanceUserIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(portfolioInstanceUsers).where(and(eq(portfolioInstanceUsers.id, portfolioInstanceUserId!), eq(portfolioInstanceUsers.userId, session?.user.id!)))
    .returning();
    return { portfolioInstanceUser: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

