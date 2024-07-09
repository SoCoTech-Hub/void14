import { and, eq } from "drizzle-orm";

import type { PortfolioInstanceUserId } from "@soco/portfolio-db/schema/portfolioInstanceUsers";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/portfolio-db/index";
import { portfolioInstances } from "@soco/portfolio-db/schema/portfolioInstances";
import {
  portfolioInstanceUserIdSchema,
  portfolioInstanceUsers,
} from "@soco/portfolio-db/schema/portfolioInstanceUsers";

export const getPortfolioInstanceUsers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      portfolioInstanceUser: portfolioInstanceUsers,
      portfolioInstance: portfolioInstances,
    })
    .from(portfolioInstanceUsers)
    .leftJoin(
      portfolioInstances,
      eq(portfolioInstanceUsers.portfolioInstanceId, portfolioInstances.id),
    )
    .where(eq(portfolioInstanceUsers.userId, session?.user.id!));
  const p = rows.map((r) => ({
    ...r.portfolioInstanceUser,
    portfolioInstance: r.portfolioInstance,
  }));
  return { portfolioInstanceUsers: p };
};

export const getPortfolioInstanceUserById = async (
  id: PortfolioInstanceUserId,
) => {
  const { session } = await getUserAuth();
  const { id: portfolioInstanceUserId } = portfolioInstanceUserIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      portfolioInstanceUser: portfolioInstanceUsers,
      portfolioInstance: portfolioInstances,
    })
    .from(portfolioInstanceUsers)
    .where(
      and(
        eq(portfolioInstanceUsers.id, portfolioInstanceUserId),
        eq(portfolioInstanceUsers.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      portfolioInstances,
      eq(portfolioInstanceUsers.portfolioInstanceId, portfolioInstances.id),
    );
  if (row === undefined) return {};
  const p = {
    ...row.portfolioInstanceUser,
    portfolioInstance: row.portfolioInstance,
  };
  return { portfolioInstanceUser: p };
};
